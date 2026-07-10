import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/admin/hr')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN', 'HR')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get('employees')
  getEmployees() {
    return this.hrService.getEmployees();
  }

  @Get('employees/:id')
  getEmployee(@Param('id') id: string) {
    return this.hrService.getEmployeeById(id);
  }

  @Post('employees')
  createEmployee(@Body() data: { name: string; email: string; role: string; department: string; salary: number }) {
    return this.hrService.createEmployee(data);
  }

  @Post('attendance')
  markAttendance(@Body() body: { employeeId: string; status: 'PRESENT' | 'ABSENT' | 'LEAVE' }) {
    return this.hrService.markAttendance(body.employeeId, body.status);
  }

  @Post('payroll')
  generatePayrollSlip(@Body() body: { employeeId: string; month: number; year: number }) {
    return this.hrService.generatePayrollSlip(body.employeeId, body.month, body.year);
  }
}

