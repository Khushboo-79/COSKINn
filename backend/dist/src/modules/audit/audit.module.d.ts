import { OnModuleInit } from '@nestjs/common';
import { AuditService } from './audit.service';
export declare class AuditModule implements OnModuleInit {
    private readonly auditService;
    constructor(auditService: AuditService);
    onModuleInit(): Promise<void>;
}
