import { OnModuleInit } from '@nestjs/common';
import { HrService } from './hr.service';
export declare class HrModule implements OnModuleInit {
    private readonly hrService;
    constructor(hrService: HrService);
    onModuleInit(): Promise<void>;
}
