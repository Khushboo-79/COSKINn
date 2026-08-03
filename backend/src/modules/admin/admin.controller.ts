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

  @Post('roles')
  createRole(@Body() body: { name: string, description?: string, panelAccess: string[] }) {
    return this.adminService.createRole(body);
  }

  @Put('roles/:id')
  updateRole(@Param('id') id: string, @Body() body: { name?: string, description?: string, panelAccess?: string[], isActive?: boolean }) {
    return this.adminService.updateRole(id, body);
  }

  @Put('roles/:id/panels')
  updateRolePanelAccess(@Param('id') id: string, @Body() body: { panelAccess: string[] }) {
    return this.adminService.updateRolePanelAccess(id, body.panelAccess);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Post('users')
  createStaffUser(@Body() body: { firstName: string, lastName: string, email: string, phone: string, roleId: string }) {
    return this.adminService.createStaffUser(body);
  }

  @Put('users/:id/role')
  updateUserRole(@Param('id') id: string, @Body() body: { roleId: string }) {
    return this.adminService.updateUserRole(id, body.roleId);
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
