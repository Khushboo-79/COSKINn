import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { BonusService } from '../bonus/bonus.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private bonusService;
    private readonly logger;
    private adminTwilioClient;
    private customerTwilioClient?;
    constructor(prisma: PrismaService, jwtService: JwtService, bonusService: BonusService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        nextStep: string;
        userId: string;
        phone?: undefined;
    } | {
        message: string;
        nextStep: string;
        phone: string;
        userId?: undefined;
    }>;
    sendOtp(sendOtpDto: SendOtpDto): Promise<{
        message: string;
        expires_in_minutes: number;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: string;
            phone: string | null;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            roles: string[];
        };
    }>;
    verifyTotp(userId: string, totp: string): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: string;
            phone: string | null;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            roles: string[];
            panelAccess: string[];
        };
    }>;
    generateTotp(userId: string): Promise<{
        secret: string;
        qrCodeUrl: string;
    }>;
    verifyAndEnableTotp(userId: string, totp: string): Promise<{
        success: boolean;
        message: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(refreshToken?: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
