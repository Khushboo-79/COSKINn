import { Controller, Get, Post, Put, Body, UseGuards, Query, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin/config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  getOverview(@Query('platform') platform?: 'COSMETICS' | 'SKINCARE') {
    return this.adminService.getOverview(platform);
  }

  @Get('roles')
  getRoles() {
    return this.adminService.getRoles();
  }

  @Put('roles/:id/panels')
  updateRolePanelAccess(@Param('id') id: string, @Body() body: { panelAccess: string[] }) {
    return this.adminService.updateRolePanelAccess(id, body.panelAccess);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Post('users/assign-role')
  assignRole(@Body() body: { userId: string, roleName: string }) {
    return this.adminService.assignRole(body.userId, body.roleName);
  }

  @Get('settings')
  getSettings() {
    return this.adminService.getSettings();
  }

  @Put('settings')
  updateSettings(@Body() body: any) {
    return this.adminService.updateSettings(body);
  }

  @Get('notifications')
  getNotifications() {
    return this.adminService.getNotifications();
  }
}
