"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const twilio_1 = require("twilio");
const speakeasy = __importStar(require("speakeasy"));
const QRCode = __importStar(require("qrcode"));
const bonus_service_1 = require("../bonus/bonus.service");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    bonusService;
    logger = new common_1.Logger(AuthService_1.name);
    adminTwilioClient;
    customerTwilioClient;
    constructor(prisma, jwtService, bonusService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.bonusService = bonusService;
        this.adminTwilioClient = new twilio_1.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        if (process.env.TWILIO_CUSTOMER_ACCOUNT_SID) {
            this.customerTwilioClient = new twilio_1.Twilio(process.env.TWILIO_CUSTOMER_ACCOUNT_SID, process.env.TWILIO_CUSTOMER_AUTH_TOKEN);
        }
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new common_1.BadRequestException('Email is already registered');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
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
        await this.bonusService.awardSignupBonus(user.id);
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles
            }
        };
    }
    async customerLogin(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { roles: { include: { role: true } } }
        });
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isCustomer = user.roles.some(ur => ur.role.name === 'CUSTOMER');
        if (!isCustomer) {
            throw new common_1.UnauthorizedException('This endpoint is for customers only. Use admin login.');
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
                email: user.email,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                roles
            }
        };
    }
    async login(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
            include: {
                roles: { include: { role: true } }
            }
        });
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.phone) {
            throw new common_1.BadRequestException('Admin account does not have a registered phone number for 2FA.');
        }
        const staff2fa = await this.prisma.staff2fa.findUnique({ where: { userId: user.id } });
        if (staff2fa && staff2fa.isVerified) {
            return {
                message: 'Password accepted. Please provide your Authenticator App TOTP code.',
                nextStep: 'verify-totp',
                userId: user.id
            };
        }
        await this.sendOtp({ phone: user.phone, isAdminLogin: true });
        return {
            message: 'Password accepted. OTP sent to registered phone number.',
            nextStep: 'verify-otp',
            phone: user.phone
        };
    }
    async sendOtp(sendOtpDto) {
        const { phone, isAdminLogin } = sendOtpDto;
        let user = await this.prisma.user.findUnique({
            where: { phone },
            include: { roles: { include: { role: true } } }
        });
        if (isAdminLogin && !user) {
            throw new common_1.UnauthorizedException('Admin account not found for this phone number');
        }
        if (isAdminLogin && user) {
            const isSuperadminOrAdmin = user.roles.some(ur => ur.role.name !== 'CUSTOMER');
            if (!isSuperadminOrAdmin) {
                throw new common_1.UnauthorizedException('Access denied. Not an admin account.');
            }
        }
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
        const isCustomerAccount = !isAdminLogin;
        const client = isCustomerAccount && this.customerTwilioClient ? this.customerTwilioClient : this.adminTwilioClient;
        const serviceSid = isCustomerAccount && process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID ? process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID : process.env.TWILIO_VERIFY_SERVICE_SID;
        try {
            if (process.env.NODE_ENV !== 'production' || process.env.USE_MOCK_OTP === 'true') {
                this.logger.debug(`[DEV MODE] Skipped Twilio SMS for ${phone}. Use master OTP: 1234`);
                return { message: 'OTP sent successfully (Dev Mode)', expires_in_minutes: 10 };
            }
            await client.verify.v2
                .services(serviceSid)
                .verifications.create({ to: phone, channel: 'sms' });
            this.logger.debug(`[Twilio Verify] Sent OTP to ${phone}`);
        }
        catch (error) {
            this.logger.error(`Failed to send OTP via Twilio to ${phone}`, error);
            throw new common_1.BadRequestException('Failed to send OTP via SMS. Please try again.');
        }
        return { message: 'OTP sent successfully', expires_in_minutes: 10 };
    }
    async verifyOtp(verifyOtpDto) {
        const { phone, otp } = verifyOtpDto;
        const user = await this.prisma.user.findUnique({
            where: { phone },
            include: {
                roles: {
                    include: { role: true }
                }
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isAdmin = user.roles.some(ur => ur.role.name !== 'CUSTOMER');
        const client = !isAdmin && this.customerTwilioClient ? this.customerTwilioClient : this.adminTwilioClient;
        const serviceSid = !isAdmin && process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID ? process.env.TWILIO_CUSTOMER_VERIFY_SERVICE_SID : process.env.TWILIO_VERIFY_SERVICE_SID;
        try {
            if ((process.env.NODE_ENV !== 'production' || process.env.USE_MOCK_OTP === 'true') && otp === '1234') {
                this.logger.debug(`[DEV MODE] Master OTP accepted for ${phone}`);
            }
            else {
                const verificationCheck = await client.verify.v2
                    .services(serviceSid)
                    .verificationChecks.create({ to: phone, code: otp });
                if (verificationCheck.status !== 'approved') {
                    throw new common_1.BadRequestException('Invalid or expired OTP');
                }
            }
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            this.logger.error(`Failed to verify OTP with Twilio for ${phone}`, error);
            throw new common_1.BadRequestException('Invalid or expired OTP');
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
    async verifyTotp(userId, totp) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: { include: { role: true } },
                staff2fa: true
            }
        });
        if (!user || !user.staff2fa || !user.staff2fa.isVerified) {
            throw new common_1.UnauthorizedException('User not enrolled in TOTP 2FA');
        }
        const isValid = speakeasy.totp.verify({ secret: user.staff2fa.totpSecret, encoding: 'base32', token: totp, window: 1 });
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid TOTP code');
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
    async generateTotp(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.email)
            throw new common_1.BadRequestException('User missing email');
        const secretObj = speakeasy.generateSecret({ name: 'Fairenne Admin (' + user.email + ')' });
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
    async verifyAndEnableTotp(userId, totp) {
        const staff2fa = await this.prisma.staff2fa.findUnique({ where: { userId } });
        if (!staff2fa)
            throw new common_1.BadRequestException('No TOTP secret found');
        const isValid = speakeasy.totp.verify({ secret: staff2fa.totpSecret, encoding: 'base32', token: totp, window: 1 });
        if (!isValid)
            throw new common_1.BadRequestException('Invalid TOTP code');
        await this.prisma.staff2fa.update({
            where: { userId },
            data: { isVerified: true }
        });
        return { success: true, message: 'TOTP 2FA enabled successfully' };
    }
    async requestPasswordReset(email) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return { message: 'If an account with that email exists, a password reset link has been sent.' };
        }
        const otp = process.env.NODE_ENV !== 'production' ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.prisma.otpLog.create({
            data: {
                userId: user.id,
                email: user.email,
                otpHash: otp,
                expiresAt,
                isUsed: false
            }
        });
        this.logger.debug(`[DEV MODE] Password Reset OTP for ${email}: ${otp}`);
        return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }
    async resetPassword(email, otp, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const validOtp = await this.prisma.otpLog.findFirst({
            where: {
                userId: user.id,
                email,
                otpHash: otp,
                isUsed: false,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        });
        if (!validOtp) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { passwordHash }
        });
        await this.prisma.otpLog.update({
            where: { id: validOtp.id },
            data: { isUsed: true }
        });
        return { success: true, message: 'Password has been reset successfully' };
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
            throw new common_1.BadRequestException('Incorrect current password');
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash }
        });
        return { success: true, message: 'Password updated successfully' };
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is required');
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
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        if (session.isRevoked) {
            throw new common_1.UnauthorizedException('Session has been revoked');
        }
        if (new Date() > session.expiresAt) {
            throw new common_1.UnauthorizedException('Refresh token expired');
        }
        const roles = session.user.roles.map(ur => ur.role.name);
        const panelAccess = Array.from(new Set(session.user.roles.flatMap(ur => ur.role.panelAccess || [])));
        const payload = { sub: session.user.id, email: session.user.email, roles, panelAccess };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refreshToken
        };
    }
    async logout(refreshToken) {
        if (refreshToken) {
            await this.prisma.loginSession.updateMany({
                where: { refreshToken },
                data: { isRevoked: true }
            });
        }
        return { success: true, message: 'Logged out successfully. Please clear your local token.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        bonus_service_1.BonusService])
], AuthService);
//# sourceMappingURL=auth.service.js.map