import { Module } from '@nestjs/common';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';
import { MarketingCron } from './marketing.cron';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [MarketingController],
  providers: [MarketingService, MarketingCron],
})
export class MarketingModule {}
