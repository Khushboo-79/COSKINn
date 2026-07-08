import { Module } from '@nestjs/common';
import { RewardPointService } from './reward-point.service';
import { RewardPointController } from './reward-point.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RewardPointController],
  providers: [RewardPointService],
  exports: [RewardPointService]
})
export class RewardPointModule {}
