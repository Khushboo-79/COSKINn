import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) { }

  async createTicket(userId: string, subject: string, priority: string = 'NORMAL', category?: string) {
    const now = new Date();
    const slaFirstResponseDeadline = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours
    const slaResolutionDeadline = new Date(now.getTime() + (priority === 'URGENT' ? 12 : 24) * 60 * 60 * 1000);

    return this.prisma.supportTicket.create({
      data: { userId, subject, priority, category, slaFirstResponseDeadline, slaResolutionDeadline }
    });
  }

  async createContactTicket(userId: string, subject: string, message: string, priority: string = 'NORMAL') {
    const ticket = await this.createTicket(userId, subject, priority, 'CONTACT_FORM');
    await this.addMessage(ticket.id, userId, 'USER', message);
    return ticket;
  }

  async getTickets(status?: string) {
    const where = status && status !== 'ALL' ? { status } : {};
    return this.prisma.supportTicket.findMany({
      where,
      include: { user: true, assignedTo: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTicketMessages(ticketId: string) {
    return this.prisma.ticketMessage.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async addMessage(ticketId: string, senderId: string, senderRole: 'USER' | 'ADMIN', message: string) {
    const ticket = await this.prisma.supportTicket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    // First Response SLA tracking
    if (senderRole === 'ADMIN' && !ticket.firstResponseAt) {
      const firstResponseAt = new Date();
      const slaBreached = ticket.slaFirstResponseDeadline ? firstResponseAt > ticket.slaFirstResponseDeadline : false;

      await this.prisma.supportTicket.update({
        where: { id: ticketId },
        data: { firstResponseAt, slaBreached: ticket.slaBreached || slaBreached }
      });
    }

    return this.prisma.ticketMessage.create({
      data: {
        ticketId,
        senderId,
        senderRole,
        message
      }
    });
  }

  async closeTicket(ticketId: string) {
    const ticket = await this.prisma.supportTicket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    const resolvedAt = new Date();
    const slaBreached = ticket.slaResolutionDeadline ? resolvedAt > ticket.slaResolutionDeadline : false;

    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: 'CLOSED',
        resolvedAt,
        slaBreached: ticket.slaBreached || slaBreached
      }
    });
  }

  async assignTicket(ticketId: string, adminId: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { assignedToId: adminId }
    });
  }

  async escalateTicket(ticketId: string) {
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: 'ESCALATED', priority: 'URGENT' }
    });
  }

  async getSlaStats() {
    const total = await this.prisma.supportTicket.count();
    const breached = await this.prisma.supportTicket.count({ where: { slaBreached: true } });
    const resolved = await this.prisma.supportTicket.count({ where: { status: 'CLOSED' } });
    const escalated = await this.prisma.supportTicket.count({ where: { status: 'ESCALATED' } });

    return {
      total,
      breached,
      resolved,
      escalated,
      complianceRate: total > 0 ? Math.round(((total - breached) / total) * 100) : 100
    };
  }
}
