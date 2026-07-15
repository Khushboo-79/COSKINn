import { Module, Global, OnModuleInit } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService]
})
export class AuditModule implements OnModuleInit {
  constructor(private readonly auditService: AuditService) {}

  async onModuleInit() {
    await this.auditService.seedAuditLogs();
  }
}
