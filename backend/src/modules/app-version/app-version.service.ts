import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AppVersionService {
  constructor(private prisma: PrismaService) {}

  async create(data: { platform: string; latestVersion: string; minVersion: string; forceUpdate: boolean }) {
    return this.prisma.appVersion.create({
      data,
    });
  }

  async checkVersion(platform: string, currentVersion: string) {
    const latest = await this.prisma.appVersion.findFirst({
      where: { platform },
      orderBy: { createdAt: 'desc' },
    });

    if (!latest) {
      return { status: 'UP_TO_DATE', updateUrl: '' };
    }

    const isOlder = currentVersion !== latest.latestVersion && currentVersion < latest.latestVersion;
    
    if (isOlder) {
      if (latest.forceUpdate || currentVersion < latest.minVersion) {
        return { status: 'FORCE_UPDATE', updateUrl: 'appstore-url' };
      }
      return { status: 'OPTIONAL_UPDATE', updateUrl: 'appstore-url' };
    }

    return { status: 'UP_TO_DATE', updateUrl: '' };
  }

  async findAll() {
    return this.prisma.appVersion.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
