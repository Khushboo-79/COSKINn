import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getCurrentUser(req: any): any;
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
    customerLogin(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: string;
            email: string | null;
            phone: string | null;
            firstName: string | null;
            lastName: string | null;
            roles: string[];
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: string;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            roles: string[];
        };
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
    verifyTotp(body: {
        userId: string;
        totp: string;
    }): Promise<{
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
    generateTotp(req: any): Promise<{
        secret: string;
        qrCodeUrl: string;
    }>;
    verifyAndEnableTotp(req: any, body: {
        totp: string;
    }): Promise<{
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
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        otp: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(req: any, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
