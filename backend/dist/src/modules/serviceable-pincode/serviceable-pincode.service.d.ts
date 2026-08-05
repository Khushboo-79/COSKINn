import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceablePincodeDto, UpdateServiceablePincodeDto } from './dto/serviceable-pincode.dto';
export declare class ServiceablePincodeService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateServiceablePincodeDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
        state: string | null;
        pincode: string;
        isCod: boolean;
    }>;
    findAll(filters: {
        city?: string;
        state?: string;
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
        state: string | null;
        pincode: string;
        isCod: boolean;
    }[]>;
    checkServiceability(code: string): Promise<{
        serviceable: boolean;
        details: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
            state: string | null;
            pincode: string;
            isCod: boolean;
        } | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
        state: string | null;
        pincode: string;
        isCod: boolean;
    }>;
    update(id: string, data: UpdateServiceablePincodeDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
        state: string | null;
        pincode: string;
        isCod: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
        state: string | null;
        pincode: string;
        isCod: boolean;
    }>;
}
