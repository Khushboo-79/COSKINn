import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: {
        roles: { include: { role: true } }
      }
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.phone) {
      throw new BadRequestException('Admin account does not have a registered phone number for 2FA.');
    }

    // Trigger OTP sending
    await this.sendOtp({ phone: user.phone, isAdminLogin: true });

    return { 
      message: 'Password accepted. OTP sent to registered phone number.',
      nextStep: 'verify-otp',
      phone: user.phone
    };
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { phone, isAdminLogin } = sendOtpDto;

    // Check if user exists
    let user = await this.prisma.user.findUnique({
      where: { phone },
      include: { roles: { include: { role: true } } }
    });

    if (isAdminLogin && !user) {
      throw new UnauthorizedException('Admin account not found for this phone number');
    }

    if (isAdminLogin && user) {
      const isSuperadminOrAdmin = user.roles.some(ur => ur.role.name !== 'CUSTOMER');
      if (!isSuperadminOrAdmin) {
        throw new UnauthorizedException('Access denied. Not an admin account.');
      }
    }

    // Determine OTP length (4 for customers, 6 for admins)
    const otpLength = isAdminLogin ? 6 : 4;
    const otp = this.generateOtp(otpLength);
    
    // Hash OTP before saving to DB
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);
    
    // Set expiry to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // If customer doesn't exist, create a stub user
    if (!user && !isAdminLogin) {
      user = await this.prisma.user.create({
        data: {
          phone,
          roles: {
            create: {
              role: {
                connectOrCreate: {
                  where: { name: 'CUSTOMER' },
                  create: { name: 'CUSTOMER', description: 'Default customer role' }
                }
              }
            }
          }
        },
        include: { roles: { include: { role: true } } }
      });
    }

    // Invalidate previous active OTPs for this phone
    await this.prisma.otpLog.updateMany({
      where: { phone, isUsed: false, expiresAt: { gt: new Date() } },
      data: { isUsed: true } // marking them used invalidates them
    });

    // Save new OTP
    await this.prisma.otpLog.create({
      data: {
        userId: user?.id,
        phone,
        otpHash,
        expiresAt,
      }
    });

    // MOCK DELIVERY - PRINT TO TERMINAL
    this.logger.debug(`\n\n=========================================\n[MOCK SMS] OTP for ${phone} is: ${otp}\n=========================================\n`);

    return { message: 'OTP sent successfully', expires_in_minutes: 5 };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, otp } = verifyOtpDto;

    // Find the latest valid OTP
    const otpLog = await this.prisma.otpLog.findFirst({
      where: {
        phone,
        isUsed: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpLog) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Compare hash
    const isValid = await bcrypt.compare(otp, otpLog.otpHash);
    if (!isValid) {
      throw new BadRequestException('Incorrect OTP');
    }

    // Mark as used
    await this.prisma.otpLog.update({
      where: { id: otpLog.id },
      data: { isUsed: true }
    });

    // Fetch user
    const user = await this.prisma.user.findUnique({
      where: { id: otpLog.userId! },
      include: {
        roles: {
          include: { role: true }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const roles = user.roles.map(ur => ur.role.name);
    const payload = { sub: user.id, email: user.email, roles };
    
    // Generate refresh token (random string for now)
    const refreshToken = require('crypto').randomBytes(40).toString('hex');
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.prisma.loginSession.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: refreshExpiresAt,
      }
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles
      }
    };
  }

  private generateOtp(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }
}
