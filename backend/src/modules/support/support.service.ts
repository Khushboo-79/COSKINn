import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async createTicket(userId: string, subject: string, priority: string = 'NORMAL') {
    return this.prisma.supportTicket.create({
      data: { userId, subject, priority }
    });
  }

  async getTickets(status?: string) {
    const where = status ? { status } : {};
    return this.prisma.supportTicket.findMany({ where, include: { user: true } });
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
    return this.prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: 'CLOSED' }
    });
  }
}
