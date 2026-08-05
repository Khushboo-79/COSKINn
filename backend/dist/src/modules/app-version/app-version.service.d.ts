import { PrismaService } from '../../prisma/prisma.service';
export declare class AppVersionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        platform: string;
        latestVersion: string;
        minVersion: string;
        forceUpdate: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        platform: string;
        minVersion: string;
        latestVersion: string;
        forceUpdate: boolean;
    }>;
    checkVersion(platform: string, currentVersion: string): Promise<{
        status: string;
        updateUrl: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        platform: string;
        minVersion: string;
        latestVersion: string;
        forceUpdate: boolean;
    }[]>;
}
