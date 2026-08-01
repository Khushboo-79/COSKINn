import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('notification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('push')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async sendPushNotification(
    @Body() body: { userId: string; title: string; body: string; mobileToken?: string }
  ) {
    return this.notificationService.sendPushNotification(
      body.userId,
      body.title,
      body.body,
      body.mobileToken
    );
  }
}
