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
    getEmployees(): Promise<({
        attendance: {
            id: string;
            employeeId: string;
            status: string;
            createdAt: Date;
            date: Date;
        }[];
    } & {
        id: string;
        employeeId: string;
        name: string;
        email: string;
        phone: string | null;
        role: string;
        department: string | null;
        salary: number;
        status: string;
        joinDate: Date;
        leaveBalance: number;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getEmployee(id: string): Promise<{
        attendance: {
            id: string;
            employeeId: string;
            status: string;
            createdAt: Date;
            date: Date;
        }[];
        payrolls: {
            id: string;
            employeeId: string;
            createdAt: Date;
            month: number;
            year: number;
            basic: number;
            deductions: number;
            netPay: number;
            pdfUrl: string | null;
        }[];
        leaveRequests: {
            id: string;
            employeeId: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            fromDate: Date;
            toDate: Date;
            days: number;
            reason: string | null;
        }[];
    } & {
        id: string;
        employeeId: string;
        name: string;
        email: string;
        phone: string | null;
        role: string;
        department: string | null;
        salary: number;
        status: string;
        joinDate: Date;
        leaveBalance: number;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        employeeId: string;
        name: string;
        email: string;
        phone: string | null;
        role: string;
        department: string | null;
        salary: number;
        status: string;
        joinDate: Date;
        leaveBalance: number;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getLeaveRequests(): Promise<({
        employee: {
            id: string;
            employeeId: string;
            name: string;
            email: string;
            phone: string | null;
            role: string;
            department: string | null;
            salary: number;
            status: string;
            joinDate: Date;
            leaveBalance: number;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        employeeId: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        fromDate: Date;
        toDate: Date;
        days: number;
        reason: string | null;
    })[]>;
    updateLeaveStatus(id: string, body: {
        status: 'Approved' | 'Rejected';
    }): Promise<{
        id: string;
        employeeId: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        fromDate: Date;
        toDate: Date;
        days: number;
        reason: string | null;
    }>;
    getPayrollSummary(): Promise<any[]>;
    markAttendance(body: {
        employeeId: string;
        status: 'PRESENT' | 'ABSENT' | 'LEAVE';
    }): Promise<{
        id: string;
        employeeId: string;
        status: string;
        createdAt: Date;
        date: Date;
    }>;
    seedHrData(): Promise<{
        message: string;
    }>;
}
