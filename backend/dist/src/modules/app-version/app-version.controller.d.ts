import { AppVersionService } from './app-version.service';
export declare class AppVersionController {
    private readonly appVersionService;
    constructor(appVersionService: AppVersionService);
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
    checkVersion(platform: string, version: string): Promise<{
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
