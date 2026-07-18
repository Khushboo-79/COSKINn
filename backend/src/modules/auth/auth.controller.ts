import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UseGuards, Request } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('send-otp')
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('verify-totp')
  verifyTotp(@Body() body: { userId: string, totp: string }) {
    return this.authService.verifyTotp(body.userId, body.totp);
  }

  @Post('2fa/generate')
  @UseGuards(JwtAuthGuard)
  generateTotp(@Request() req) {
    return this.authService.generateTotp(req.user.id);
  }

  @Post('2fa/verify')
  @UseGuards(JwtAuthGuard)
  verifyAndEnableTotp(@Request() req, @Body() body: { totp: string }) {
    return this.authService.verifyAndEnableTotp(req.user.id, body.totp);
  }

  @Post('refresh')
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  logout(@Body('refreshToken') refreshToken?: string) {
    return this.authService.logout(refreshToken);
  }
}
