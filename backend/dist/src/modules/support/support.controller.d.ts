import { SupportService } from './support.service';
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
    createContactTicket(req: any, body: {
        subject: string;
        message: string;
        priority?: string;
    }): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    createTicket(req: any, body: {
        subject: string;
        priority?: string;
    }): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    getTicketMessages(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        ticketId: string;
        senderId: string;
        senderRole: string;
    }[]>;
    getTickets(status?: string): Promise<({
        user: {
            id: string;
            email: string | null;
            phone: string | null;
            passwordHash: string | null;
            firstName: string | null;
            lastName: string | null;
            isActive: boolean;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            membershipTierId: string | null;
        };
        assignedTo: {
            id: string;
            email: string | null;
            phone: string | null;
            passwordHash: string | null;
            firstName: string | null;
            lastName: string | null;
            isActive: boolean;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            membershipTierId: string | null;
        } | null;
    } & {
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    })[]>;
    closeTicket(ticketId: string): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    replyToTicket(ticketId: string, body: {
        adminId: string;
        message: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        ticketId: string;
        senderId: string;
        senderRole: string;
    }>;
    escalateTicket(ticketId: string): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    assignTicket(ticketId: string, body: {
        adminId: string;
    }): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    getSlaStats(): Promise<{
        total: number;
        breached: number;
        resolved: number;
        escalated: number;
        complianceRate: number;
    }>;
    getSettings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        enableAutoReply: boolean;
        autoReplyMessage: string;
        workingHoursStart: string;
        workingHoursEnd: string;
    }>;
    updateSettings(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        enableAutoReply: boolean;
        autoReplyMessage: string;
        workingHoursStart: string;
        workingHoursEnd: string;
    }>;
}
