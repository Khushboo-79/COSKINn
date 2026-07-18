import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComplianceService {
  constructor(private prisma: PrismaService) {}

  async recordConsent(userId: string, data: { push: boolean; email: boolean; sms: boolean; whatsapp: boolean }) {
    return this.prisma.customerConsent.upsert({
      where: { userId },
      update: {
        push: data.push,
        email: data.email,
        sms: data.sms,
        whatsapp: data.whatsapp,
      },
      create: {
        userId,
        push: data.push,
        email: data.email,
        sms: data.sms,
        whatsapp: data.whatsapp,
      },
    });
  }

  async getConsents(userId: string) {
    return this.prisma.customerConsent.findUnique({
      where: { userId },
    });
  }

  async createDataRequest(userId: string, data: { requestType: 'EXPORT' | 'DELETE' }) {
    return this.prisma.dataRequest.create({
      data: {
        userId,
        requestType: data.requestType,
        status: 'PENDING',
      },
    });
  }

  async getDataRequests(userId: string) {
    return this.prisma.dataRequest.findMany({
      where: { userId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async updateDataRequestStatus(id: string, data: { status: 'PENDING' | 'PROCESSING' | 'FULFILLED' | 'REJECTED'; exceptions?: string }) {
    const req = await this.prisma.dataRequest.findUnique({ where: { id } });
    if (!req) throw new NotFoundException('Data request not found');
    
    return this.prisma.dataRequest.update({
      where: { id },
      data: {
        status: data.status,
        exceptions: data.exceptions,
        fulfilledAt: (data.status === 'FULFILLED' || data.status === 'REJECTED') ? new Date() : null,
      },
    });
  }

  async getAllDataRequests() {
    return this.prisma.dataRequest.findMany({
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } },
      orderBy: { requestedAt: 'desc' },
    });
  }
}

