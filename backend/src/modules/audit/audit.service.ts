import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logEvent(action: string, entity: string, entityId: string, adminId?: string, oldData?: any, newData?: any) {
    return this.prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        adminId,
        oldData: oldData ? JSON.stringify(oldData) : null,
        newData: newData ? JSON.stringify(newData) : null
      }
    });
  }

  async getLogs(page = 1, limit = 50, entity?: string) {
    const where = entity ? { entity } : {};
    return this.prisma.auditLog.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }
}
