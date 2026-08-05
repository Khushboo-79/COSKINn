import { PrismaService } from '../../prisma/prisma.service';
export declare class SupportService {
    private prisma;
    constructor(prisma: PrismaService);
    createTicket(userId: string, subject: string, priority?: string, category?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        category: string | null;
        userId: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    createContactTicket(userId: string, subject: string, message: string, priority?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        category: string | null;
        userId: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        category: string | null;
        userId: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    })[]>;
    getTicketMessages(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        senderId: string;
        senderRole: string;
        ticketId: string;
    }[]>;
    addMessage(ticketId: string, senderId: string, senderRole: 'USER' | 'ADMIN', message: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        senderId: string;
        senderRole: string;
        ticketId: string;
    }>;
    closeTicket(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        category: string | null;
        userId: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    assignTicket(ticketId: string, adminId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        category: string | null;
        userId: string;
        subject: string;
        priority: string;
        slaFirstResponseDeadline: Date | null;
        slaResolutionDeadline: Date | null;
        firstResponseAt: Date | null;
        resolvedAt: Date | null;
        slaBreached: boolean;
        assignedToId: string | null;
    }>;
    escalateTicket(ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        category: string | null;
        userId: string;
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
    updateSettings(data: {
        timezone?: string;
        firstResponseSlaHours?: number;
        pauseSlaOnWeekends?: boolean;
        autoAssign?: boolean;
        sendCsat?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        enableAutoReply: boolean;
        autoReplyMessage: string;
        workingHoursStart: string;
        workingHoursEnd: string;
    }>;
}
