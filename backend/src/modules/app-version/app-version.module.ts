import { Module } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { AppVersionController } from './app-version.controller';

@Module({
  controllers: [AppVersionController],
  providers: [AppVersionService],
  exports: [AppVersionService],
})
export class AppVersionModule {}
