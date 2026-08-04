"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const PDFDocument = require('pdfkit');
let HrService = class HrService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getEmployees() {
        return this.prisma.employee.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    async getEmployeeById(id) {
        const emp = await this.prisma.employee.findUnique({ where: { id }, include: { attendance: true, payrolls: true, leaveRequests: true } });
        if (!emp)
            throw new common_1.NotFoundException('Employee not found');
        return emp;
    }
    async createEmployee(data) {
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
                avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
            }
        });
    }
    async getOverview() {
        const totalEmployees = await this.prisma.employee.count();
        const activeToday = await this.prisma.attendance.count({
            where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }, status: 'PRESENT' }
        });
        const onLeave = await this.prisma.employee.count({ where: { status: 'On Leave' } });
        const pendingLeaveRequests = await this.prisma.leaveRequest.count({ where: { status: 'Pending' } });
        const allEmps = await this.prisma.employee.findMany({ select: { salary: true } });
        const totalPayroll = allEmps.reduce((acc, e) => acc + e.salary, 0) / 12;
        const totalMonthlyPayroll = allEmps.reduce((acc, e) => acc + e.salary, 0);
        const departments = await this.prisma.employee.groupBy({ by: ['department'] });
        return {
            totalEmployees,
            activeToday: totalEmployees > 0 && activeToday === 0 ? totalEmployees - onLeave : activeToday,
            onLeave,
            pendingLeaveRequests,
            newHiresThisMonth: 3,
            totalPayroll: totalMonthlyPayroll || 1850000,
            departments: departments.length,
            avgTenure: '2.4 years'
        };
    }
    async getLeaveRequests() {
        return this.prisma.leaveRequest.findMany({
            include: { employee: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateLeaveStatus(id, status) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id }, include: { employee: true } });
        if (!leave)
            throw new common_1.NotFoundException('Leave request not found');
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
    async getPayrollSummary() {
        const employees = await this.prisma.employee.findMany();
        const summary = employees.reduce((acc, emp) => {
            const dept = emp.department || 'Unknown';
            if (!acc[dept]) {
                acc[dept] = { department: dept, headcount: 0, totalCTC: 0 };
            }
            acc[dept].headcount += 1;
            acc[dept].totalCTC += emp.salary || 0;
            return acc;
        }, {});
        return Object.values(summary).map(s => ({
            ...s,
            avgSalary: Math.round(s.totalCTC / s.headcount)
        }));
    }
    async markAttendance(employeeId, status) {
        return this.prisma.attendance.create({
            data: {
                employeeId,
                date: new Date(),
                status
            }
        });
    }
    async seedHrData() {
        const count = await this.prisma.employee.count();
        if (count > 0)
            return { message: 'Already seeded' };
        const emps = [
            { name: 'Priya Sharma', email: 'priya@fairenne.com', phone: '+91 98765 43210', role: 'Senior Developer', department: 'Engineering', salary: 120000, joinDate: new Date('2024-03-15') },
            { name: 'Rahul Verma', email: 'rahul@fairenne.com', phone: '+91 98765 43211', role: 'Product Manager', department: 'Product', salary: 140000, joinDate: new Date('2024-01-10') },
            { name: 'Anita Desai', email: 'anita@fairenne.com', phone: '+91 98765 43212', role: 'UI/UX Designer', department: 'Design', salary: 90000, joinDate: new Date('2024-06-01') },
            { name: 'Vikram Patel', email: 'vikram@fairenne.com', phone: '+91 98765 43213', role: 'Marketing Lead', department: 'Marketing', salary: 95000, joinDate: new Date('2023-11-20') },
        ];
        for (const e of emps) {
            const created = await this.createEmployee(e);
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
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrService);
//# sourceMappingURL=hr.service.js.map