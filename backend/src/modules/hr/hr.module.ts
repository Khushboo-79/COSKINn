import { Module, OnModuleInit } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HrController],
  providers: [HrService],
  exports: [HrService]
})
export class HrModule implements OnModuleInit {
  constructor(private readonly hrService: HrService) {}

  async onModuleInit() {
    await this.hrService.seedHrData();
  }
}
