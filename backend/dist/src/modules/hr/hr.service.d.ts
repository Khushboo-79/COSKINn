import { PrismaService } from '../../prisma/prisma.service';
export declare class HrService {
    private prisma;
    constructor(prisma: PrismaService);
    getEmployees(): Promise<{
        id: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string;
        role: string;
        avatar: string | null;
        employeeId: string;
        department: string | null;
        salary: number;
        joinDate: Date;
        leaveBalance: number;
    }[]>;
    getEmployeeById(id: string): Promise<{
        attendance: {
            id: string;
            createdAt: Date;
            status: string;
            employeeId: string;
            date: Date;
        }[];
        payrolls: {
            id: string;
            createdAt: Date;
            year: number;
            pdfUrl: string | null;
            month: number;
            employeeId: string;
            basic: number;
            deductions: number;
            netPay: number;
        }[];
        leaveRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            type: string;
            reason: string | null;
            days: number;
            employeeId: string;
            fromDate: Date;
            toDate: Date;
        }[];
    } & {
        id: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string;
        role: string;
        avatar: string | null;
        employeeId: string;
        department: string | null;
        salary: number;
        joinDate: Date;
        leaveBalance: number;
    }>;
    createEmployee(data: {
        name: string;
        email: string;
        role: string;
        department: string;
        salary: number;
        phone?: string;
        joinDate?: Date;
    }): Promise<{
        id: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        status: string;
        role: string;
        avatar: string | null;
        employeeId: string;
        department: string | null;
        salary: number;
        joinDate: Date;
        leaveBalance: number;
    }>;
    getOverview(): Promise<{
        totalEmployees: number;
        activeToday: number;
        onLeave: number;
        pendingLeaveRequests: number;
        newHiresThisMonth: number;
        totalPayroll: number;
        departments: number;
        avgTenure: string;
    }>;
    getLeaveRequests(): Promise<({
        employee: {
            id: string;
            email: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            status: string;
            role: string;
            avatar: string | null;
            employeeId: string;
            department: string | null;
            salary: number;
            joinDate: Date;
            leaveBalance: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        reason: string | null;
        days: number;
        employeeId: string;
        fromDate: Date;
        toDate: Date;
    })[]>;
    updateLeaveStatus(id: string, status: 'Approved' | 'Rejected'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        reason: string | null;
        days: number;
        employeeId: string;
        fromDate: Date;
        toDate: Date;
    }>;
    getPayrollSummary(): Promise<any[]>;
    markAttendance(employeeId: string, status: 'PRESENT' | 'ABSENT' | 'LEAVE'): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        employeeId: string;
        date: Date;
    }>;
    seedHrData(): Promise<{
        message: string;
    }>;
}
