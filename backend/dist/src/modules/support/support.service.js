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
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SupportService = class SupportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTicket(userId, subject, priority = 'NORMAL', category) {
        const now = new Date();
        const slaFirstResponseDeadline = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        const slaResolutionDeadline = new Date(now.getTime() + (priority === 'URGENT' ? 12 : 24) * 60 * 60 * 1000);
        return this.prisma.supportTicket.create({
            data: {
                userId,
                subject,
                priority,
                category,
                slaFirstResponseDeadline,
                slaResolutionDeadline,
            },
        });
    }
    async createContactTicket(userId, subject, message, priority = 'NORMAL') {
        const ticket = await this.createTicket(userId, subject, priority, 'CONTACT_FORM');
        await this.addMessage(ticket.id, userId, 'USER', message);
        return ticket;
    }
    async getTickets(status) {
        const where = status && status !== 'ALL' ? { status } : {};
        return this.prisma.supportTicket.findMany({
            where,
            include: { user: true, assignedTo: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getTicketMessages(ticketId) {
        return this.prisma.ticketMessage.findMany({
            where: { ticketId },
            orderBy: { createdAt: 'asc' },
        });
    }
    async addMessage(ticketId, senderId, senderRole, message) {
        const ticket = await this.prisma.supportTicket.findUnique({
            where: { id: ticketId },
        });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        if (senderRole === 'ADMIN' && !ticket.firstResponseAt) {
            const firstResponseAt = new Date();
            const slaBreached = ticket.slaFirstResponseDeadline
                ? firstResponseAt > ticket.slaFirstResponseDeadline
                : false;
            await this.prisma.supportTicket.update({
                where: { id: ticketId },
                data: {
                    firstResponseAt,
                    slaBreached: ticket.slaBreached || slaBreached,
                },
            });
        }
        return this.prisma.ticketMessage.create({
            data: {
                ticketId,
                senderId,
                senderRole,
                message,
            },
        });
    }
    async closeTicket(ticketId) {
        const ticket = await this.prisma.supportTicket.findUnique({
            where: { id: ticketId },
        });
        if (!ticket)
            throw new common_1.NotFoundException('Ticket not found');
        const resolvedAt = new Date();
        const slaBreached = ticket.slaResolutionDeadline
            ? resolvedAt > ticket.slaResolutionDeadline
            : false;
        return this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: {
                status: 'CLOSED',
                resolvedAt,
                slaBreached: ticket.slaBreached || slaBreached,
            },
        });
    }
    async assignTicket(ticketId, adminId) {
        return this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: { assignedToId: adminId },
        });
    }
    async escalateTicket(ticketId) {
        return this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: { status: 'ESCALATED', priority: 'URGENT' },
        });
    }
    async getSlaStats() {
        const total = await this.prisma.supportTicket.count();
        const breached = await this.prisma.supportTicket.count({
            where: { slaBreached: true },
        });
        const resolved = await this.prisma.supportTicket.count({
            where: { status: 'CLOSED' },
        });
        const escalated = await this.prisma.supportTicket.count({
            where: { status: 'ESCALATED' },
        });
        return {
            total,
            breached,
            resolved,
            escalated,
            complianceRate: total > 0 ? Math.round(((total - breached) / total) * 100) : 100,
        };
    }
    async getSettings() {
        let settings = await this.prisma.supportSettings.findFirst();
        if (!settings) {
            settings = await this.prisma.supportSettings.create({
                data: {},
            });
        }
        return settings;
    }
    async updateSettings(data) {
        const settings = await this.getSettings();
        return this.prisma.supportSettings.update({
            where: { id: settings.id },
            data,
        });
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportService);
//# sourceMappingURL=support.service.js.map