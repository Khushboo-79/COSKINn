import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComplianceService {
  constructor(private prisma: PrismaService) {}

  // Consents
  async updateConsent(userId: string, data: { push?: boolean; email?: boolean; sms?: boolean; whatsapp?: boolean }) {
    return this.prisma.customerConsent.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        push: data.push ?? true,
        email: data.email ?? true,
        sms: data.sms ?? true,
        whatsapp: data.whatsapp ?? true,
      },
    });
  }

  async getConsent(userId: string) {
    let consent = await this.prisma.customerConsent.findUnique({ where: { userId } });
    if (!consent) {
      consent = await this.prisma.customerConsent.create({
        data: { userId }
      });
    }
    return consent;
  }

  // Data Requests
  async createDataRequest(userId: string, requestType: 'EXPORT' | 'DELETE') {
    return this.prisma.dataRequest.create({
      data: {
        userId,
        requestType,
        status: 'PENDING',
      },
    });
  }

  async getAdminDataRequests() {
    return this.prisma.dataRequest.findMany({
      include: { user: { select: { email: true, phone: true, firstName: true } } },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async updateDataRequestStatus(id: string, status: string) {
    return this.prisma.dataRequest.update({
      where: { id },
      data: {
        status,
        fulfilledAt: status === 'FULFILLED' ? new Date() : null,
      },
    });
  }
}
