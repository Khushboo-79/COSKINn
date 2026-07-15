import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin/hr')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN', 'HR')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get('overview')
  getOverview() {
    return this.hrService.getOverview();
  }

  @Get('employees')
  getEmployees() {
    return this.hrService.getEmployees();
  }

  @Get('employees/:id')
  getEmployee(@Param('id') id: string) {
    return this.hrService.getEmployeeById(id);
  }

  @Post('employees')
  createEmployee(@Body() data: { name: string; email: string; role: string; department: string; salary: number; phone?: string; joinDate?: string }) {
    return this.hrService.createEmployee({
      ...data,
      joinDate: data.joinDate ? new Date(data.joinDate) : undefined
    });
  }

  @Get('leaves')
  getLeaveRequests() {
    return this.hrService.getLeaveRequests();
  }

  @Post('leaves/:id/status')
  updateLeaveStatus(@Param('id') id: string, @Body() body: { status: 'Approved' | 'Rejected' }) {
    return this.hrService.updateLeaveStatus(id, body.status);
  }

  @Get('payroll')
  getPayrollSummary() {
    return this.hrService.getPayrollSummary();
  }

  @Post('attendance')
  markAttendance(@Body() body: { employeeId: string; status: 'PRESENT' | 'ABSENT' | 'LEAVE' }) {
    return this.hrService.markAttendance(body.employeeId, body.status);
  }

  @Post('seed')
  seedHrData() {
    return this.hrService.seedHrData();
  }
}

