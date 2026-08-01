import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}
