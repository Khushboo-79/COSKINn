import { HrService } from './hr.service';
export declare class HrController {
    private readonly hrService;
    constructor(hrService: HrService);
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
    getEmployees(): Promise<{
        role: string;
        id: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        avatar: string | null;
        status: string;
        employeeId: string;
        department: string | null;
        salary: number;
        joinDate: Date;
        leaveBalance: number;
    }[]>;
    getEmployee(id: string): Promise<{
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
            pdfUrl: string | null;
            month: number;
            employeeId: string;
            year: number;
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
            employeeId: string;
            fromDate: Date;
            toDate: Date;
            days: number;
        }[];
    } & {
        role: string;
        id: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        avatar: string | null;
        status: string;
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
        joinDate?: string;
    }): Promise<{
        role: string;
        id: string;
        email: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        avatar: string | null;
        status: string;
        employeeId: string;
        department: string | null;
        salary: number;
        joinDate: Date;
        leaveBalance: number;
    }>;
    getLeaveRequests(): Promise<({
        employee: {
            role: string;
            id: string;
            email: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            avatar: string | null;
            status: string;
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
        employeeId: string;
        fromDate: Date;
        toDate: Date;
        days: number;
    })[]>;
    updateLeaveStatus(id: string, body: {
        status: 'Approved' | 'Rejected';
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        reason: string | null;
        employeeId: string;
        fromDate: Date;
        toDate: Date;
        days: number;
    }>;
    getPayrollSummary(): Promise<any[]>;
    markAttendance(body: {
        employeeId: string;
        status: 'PRESENT' | 'ABSENT' | 'LEAVE';
    }): Promise<{
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
