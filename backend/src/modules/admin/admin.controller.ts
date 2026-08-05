import { Controller, Get, Post, Put, Delete, Body, UseGuards, Query, Param, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateRoleDto } from './dto/update-role.dto';
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
  createRole(@Req() req: any, @Body() body: { name: string, description?: string, panelAccess: string[] }) {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.adminService.createRole(body, userId);
  }

  @Put('roles/:id')
  updateRole(@Param('id') id: string, @Req() req: any, @Body() body: UpdateRoleDto) {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.adminService.updateRole(id, body, userId);
  }

  @Put('roles/:id/panels')
  updateRolePanelAccess(@Param('id') id: string, @Req() req: any, @Body() body: { panelAccess: string[] }) {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.adminService.updateRolePanelAccess(id, body.panelAccess, userId);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Post('users')
  createStaffUser(@Body() body: { firstName: string, lastName: string, email: string, phone: string, roleId: string }) {
    return this.adminService.createStaffUser(body);
  }

  @Put('users/:id/role')
  updateUserRole(@Param('id') id: string, @Body() body: { roleId: string }) {
    return this.adminService.updateUserRole(id, body);
  }

  @Post('users/assign-role')
  assignRole(@Body() body: { userId: string, roleName: string }) {
    return this.adminService.assignRole(body.userId, body.roleName);
  }

  @Get('staff/2fa')
  getStaff2FAStatus() {
    return this.adminService.getStaff2FAStatus();
  }

  @Post('staff/:userId/2fa/reset')
  resetStaff2FA(@Param('userId') userId: string) {
    return this.adminService.resetStaff2FA(userId);
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
