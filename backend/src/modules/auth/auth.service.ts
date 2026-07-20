import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Twilio } from 'twilio';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';

import { BonusService } from '../bonus/bonus.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private adminTwilioClient: Twilio;
  private customerTwilioClient?: Twilio;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private bonusService: BonusService
  ) {
    this.adminTwilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
    if (process.env.TWILIO_CUSTOMER_ACCOUNT_SID) {
      this.customerTwilioClient = new Twilio(process.env.TWILIO_CUSTOMER_ACCOUNT_SID, process.env.TWILIO_CUSTOMER_AUTH_TOKEN!);
    }
  }

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

    const staff2fa = await this.prisma.staff2fa.findUnique({ where: { userId: user.id } });

    if (staff2fa && staff2fa.isVerified) {
      return { 
        message: 'Password accepted. Please provide your Authenticator App TOTP code.',
        nextStep: 'verify-totp',
        userId: user.id
      };
    }

    // Fallback: Trigger OTP sending if TOTP is not enrolled
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

    // Choose Twilio client based on role
    const isCustomerAccount = !isAdminLogin;
    const client = isCustomerAccount && this.customerTwilioClient ? this.customerTwilioClient : this.adminTwilioClient;
    const serviceSid = isCustomerAccount && process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID ? process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID : process.env.TWILIO_VERIFY_SERVICE_SID!;

    // Call Twilio Verify API
    try {
      // Developer Bypass: Skip Twilio in local testing to save cost/avoid delivery issues
      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug(`[DEV MODE] Skipped Twilio SMS for ${phone}. Use master OTP: 123456`);
        return { message: 'OTP sent successfully (Dev Mode)', expires_in_minutes: 10 };
      }

      await client.verify.v2
        .services(serviceSid)
        .verifications.create({ to: phone, channel: 'sms' });
      this.logger.debug(`[Twilio Verify] Sent OTP to ${phone}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP via Twilio to ${phone}`, error);
      throw new BadRequestException('Failed to send OTP via SMS. Please try again.');
    }

    return { message: 'OTP sent successfully', expires_in_minutes: 10 };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, otp } = verifyOtpDto;

    // Fetch user FIRST to determine which Twilio account to use
    const user = await this.prisma.user.findUnique({
      where: { phone },
      include: {
        roles: {
          include: { role: true }
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Choose Twilio client based on role
    const isAdmin = user.roles.some(ur => ur.role.name !== 'CUSTOMER');
    const client = !isAdmin && this.customerTwilioClient ? this.customerTwilioClient : this.adminTwilioClient;
    const serviceSid = !isAdmin && process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID ? process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID : process.env.TWILIO_VERIFY_SERVICE_SID!;

    // Call Twilio Verify API to check the code
    try {
      // Developer Bypass: Accept master OTP in local testing
      if (process.env.NODE_ENV !== 'production' && otp === '123456') {
        this.logger.debug(`[DEV MODE] Master OTP accepted for ${phone}`);
      } else {
        const verificationCheck = await client.verify.v2
          .services(serviceSid)
          .verificationChecks.create({ to: phone, code: otp });

        if (verificationCheck.status !== 'approved') {
          throw new BadRequestException('Invalid or expired OTP');
        }
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(`Failed to verify OTP with Twilio for ${phone}`, error);
      throw new BadRequestException('Invalid or expired OTP');
    }


    const roles = user.roles.map(ur => ur.role.name);
    // Include panelAccess in the JWT payload for the PanelsGuard
    const panelAccess = Array.from(new Set(user.roles.flatMap(ur => ur.role.panelAccess || [])));
    const payload = { sub: user.id, email: user.email, roles, panelAccess };
    
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

    // Trigger signup bonus check (only runs once if rule exists)
    await this.bonusService.awardSignupBonus(user.id);

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

  async verifyTotp(userId: string, totp: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: { include: { role: true } },
        staff2fa: true
      }
    });

    if (!user || !user.staff2fa || !user.staff2fa.isVerified) {
      throw new UnauthorizedException('User not enrolled in TOTP 2FA');
    }

    const isValid = speakeasy.totp.verify({ secret: user.staff2fa.totpSecret, encoding: 'base32', token: totp, window: 1 });
    
    if (!isValid) {
      throw new UnauthorizedException('Invalid TOTP code');
    }

    const roles = user.roles.map(ur => ur.role.name);
    const panelAccess = Array.from(new Set(user.roles.flatMap(ur => ur.role.panelAccess || [])));
    const payload = { sub: user.id, email: user.email, roles, panelAccess };
    
    const refreshToken = require('crypto').randomBytes(40).toString('hex');
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
        roles,
        panelAccess
      }
    };
  }

  async generateTotp(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.email) throw new BadRequestException('User missing email');
    
    const secretObj = speakeasy.generateSecret({ name: 'COSKINn Admin (' + user.email + ')' });
    const secret = secretObj.base32;
    const otpauthUrl = secretObj.otpauth_url || '';
    const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
    
    await this.prisma.staff2fa.upsert({
      where: { userId },
      update: { totpSecret: secret, isVerified: false },
      create: { userId, totpSecret: secret, isVerified: false }
    });

    return {
      secret,
      qrCodeUrl
    };
  }

  async verifyAndEnableTotp(userId: string, totp: string) {
    const staff2fa = await this.prisma.staff2fa.findUnique({ where: { userId } });
    if (!staff2fa) throw new BadRequestException('No TOTP secret found');

    const isValid = speakeasy.totp.verify({ secret: staff2fa.totpSecret, encoding: 'base32', token: totp, window: 1 });
    if (!isValid) throw new BadRequestException('Invalid TOTP code');

    await this.prisma.staff2fa.update({
      where: { userId },
      data: { isVerified: true }
    });

    return { success: true, message: 'TOTP 2FA enabled successfully' };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const session = await this.prisma.loginSession.findUnique({
      where: { refreshToken },
      include: {
        user: {
          include: { roles: { include: { role: true } } }
        }
      }
    });

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (session.isRevoked) {
      throw new UnauthorizedException('Session has been revoked');
    }

    if (new Date() > session.expiresAt) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const roles = session.user.roles.map(ur => ur.role.name);
    const panelAccess = Array.from(new Set(session.user.roles.flatMap(ur => ur.role.panelAccess || [])));
    const payload = { sub: session.user.id, email: session.user.email, roles, panelAccess };

    // Return new access token (keep same refresh token, or could rotate it)
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken
    };
  }

  async logout(refreshToken?: string) {
    if (refreshToken) {
      await this.prisma.loginSession.updateMany({
        where: { refreshToken },
        data: { isRevoked: true }
      });
    }
    return { success: true, message: 'Logged out successfully. Please clear your local token.' };
  }
}
