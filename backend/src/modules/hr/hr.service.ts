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
    return this.prisma.employee.findMany();
  }

  async getEmployeeById(id: string) {
    const emp = await this.prisma.employee.findUnique({ where: { id }, include: { attendance: true, payrolls: true } });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  async createEmployee(data: { name: string; email: string; role: string; department: string; salary: number }) {
    return this.prisma.employee.create({ data });
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

  // --- Payroll ---
  async generatePayrollSlip(employeeId: string, month: number, year: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) throw new NotFoundException('Employee not found');

    const basic = employee.salary;
    const deductions = basic * 0.1; // Example 10% deduction for tax/PF
    const netPay = basic - deductions;

    const dir = path.join(process.cwd(), 'public', 'payrolls');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filename = `payslip_${employeeId}_${month}_${year}.pdf`;
    const filePath = path.join(dir, filename);
    const publicUrl = `/payrolls/${filename}`;

    await new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);
      doc.fontSize(20).text('COSKINn', { align: 'center' });
      doc.fontSize(12).text('SALARY SLIP', { align: 'center' }).moveDown();

      doc.text(`Employee Name: ${employee.name}`);
      doc.text(`Role/Dept: ${employee.role} - ${employee.department}`);
      doc.text(`Month/Year: ${month}/${year}`).moveDown();

      doc.text(`Basic Salary: Rs. ${basic.toFixed(2)}`);
      doc.text(`Deductions: Rs. ${deductions.toFixed(2)}`);
      doc.text(`Net Payable: Rs. ${netPay.toFixed(2)}`, { underline: true });

      doc.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    return this.prisma.payrollSlip.create({
      data: {
        employeeId,
        month,
        year,
        basic,
        deductions,
        netPay,
        pdfUrl: publicUrl
      }
    });
  }
}
