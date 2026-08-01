import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SupportGateway } from './support.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [SupportController],
  providers: [SupportService, SupportGateway],
  exports: [SupportService]
})
export class SupportModule {}
