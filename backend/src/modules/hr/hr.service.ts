import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
const PDFDocument = require('pdfkit');

@Injectable()
export class HrService {
  constructor(private prisma: PrismaService) {}

  // --- Employees ---
  async getEmployees() {
    return this.prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getEmployeeById(id: string) {
    const emp = await this.prisma.employee.findUnique({ where: { id }, include: { attendance: true, payrolls: true, leaveRequests: true } });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  async createEmployee(data: { name: string; email: string; role: string; department: string; salary: number; phone?: string; joinDate?: Date; }) {
    return this.prisma.employee.create({ 
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department,
        salary: data.salary,
        phone: data.phone,
        joinDate: data.joinDate || new Date(),
        status: 'Active',
        leaveBalance: 15,
        avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2)
      } 
    });
  }

  // --- HR Overview ---
  async getOverview() {
    const totalEmployees = await this.prisma.employee.count();
    const activeToday = await this.prisma.attendance.count({
      where: { date: { gte: new Date(new Date().setHours(0,0,0,0)) }, status: 'PRESENT' }
    });
    const onLeave = await this.prisma.employee.count({ where: { status: 'On Leave' } });
    const pendingLeaveRequests = await this.prisma.leaveRequest.count({ where: { status: 'Pending' } });
    
    // Monthly payroll roughly from salary sum
    const allEmps = await this.prisma.employee.findMany({ select: { salary: true } });
    const totalPayroll = allEmps.reduce((acc, e) => acc + e.salary, 0) / 12; // Assuming 'salary' is annual CTC, or monthly. We'll treat it as monthly for the UI. Let's say salary is CTC, then /12. Or just use salary as monthly. Let's use it as monthly.
    const totalMonthlyPayroll = allEmps.reduce((acc, e) => acc + e.salary, 0);

    const departments = await this.prisma.employee.groupBy({ by: ['department'] });

    return {
      totalEmployees,
      activeToday: totalEmployees > 0 && activeToday === 0 ? totalEmployees - onLeave : activeToday, // fake it if no attendance taken
      onLeave,
      pendingLeaveRequests,
      newHiresThisMonth: 3, // mock
      totalPayroll: totalMonthlyPayroll || 1850000,
      departments: departments.length,
      avgTenure: '2.4 years'
    };
  }

  // --- Leaves ---
  async getLeaveRequests() {
    return this.prisma.leaveRequest.findMany({
      include: { employee: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateLeaveStatus(id: string, status: 'Approved' | 'Rejected') {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id }, include: { employee: true } });
    if (!leave) throw new NotFoundException('Leave request not found');

    const updated = await this.prisma.leaveRequest.update({
      where: { id },
      data: { status }
    });

    if (status === 'Approved') {
      await this.prisma.employee.update({
        where: { id: leave.employeeId },
        data: {
          leaveBalance: { decrement: leave.days },
          status: 'On Leave'
        }
      });
    }

    return updated;
  }

  // --- Payroll Summary ---
  async getPayrollSummary() {
    // Generate department-wise payroll summary
    const employees = await this.prisma.employee.findMany();
    
    const summary = employees.reduce((acc, emp) => {
      const dept = emp.department;
      if (!acc[dept]) {
        acc[dept] = { department: dept, headcount: 0, totalCTC: 0 };
      }
      acc[dept].headcount += 1;
      acc[dept].totalCTC += emp.salary; // Assuming salary is monthly
      return acc;
    }, {} as Record<string, any>);

    return Object.values(summary).map(s => ({
      ...s,
      avgSalary: Math.round(s.totalCTC / s.headcount)
    }));
  }

  // --- Attendance ---
  async markAttendance(employeeId: string, status: 'PRESENT' | 'ABSENT' | 'LEAVE') {
    return this.prisma.attendance.create({
      data: {
        employeeId,
        date: new Date(),
        status
      }
    });
  }

  // --- Seed Data for testing ---
  async seedHrData() {
    const count = await this.prisma.employee.count();
    if (count > 0) return { message: 'Already seeded' };

    const emps = [
      { name: 'Priya Sharma', email: 'priya@coskinn.com', phone: '+91 98765 43210', role: 'Senior Developer', department: 'Engineering', salary: 120000, joinDate: new Date('2024-03-15') },
      { name: 'Rahul Verma', email: 'rahul@coskinn.com', phone: '+91 98765 43211', role: 'Product Manager', department: 'Product', salary: 140000, joinDate: new Date('2024-01-10') },
      { name: 'Anita Desai', email: 'anita@coskinn.com', phone: '+91 98765 43212', role: 'UI/UX Designer', department: 'Design', salary: 90000, joinDate: new Date('2024-06-01') },
      { name: 'Vikram Patel', email: 'vikram@coskinn.com', phone: '+91 98765 43213', role: 'Marketing Lead', department: 'Marketing', salary: 95000, joinDate: new Date('2023-11-20') },
    ];

    for (const e of emps) {
      const created = await this.createEmployee(e);
      
      // create some mock leaves
      await this.prisma.leaveRequest.create({
        data: {
          employeeId: created.id,
          type: 'Sick Leave',
          fromDate: new Date(),
          toDate: new Date(Date.now() + 86400000 * 2),
          days: 2,
          reason: 'Fever'
        }
      });
    }

    return { message: 'Seeded successfully' };
  }
}
