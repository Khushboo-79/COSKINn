import { ServiceablePincodeService } from './serviceable-pincode.service';
import { CreateServiceablePincodeDto, UpdateServiceablePincodeDto } from './dto/serviceable-pincode.dto';
export declare class ServiceablePincodeController {
    private readonly pincodeService;
    constructor(pincodeService: ServiceablePincodeService);
    create(createDto: CreateServiceablePincodeDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        city: string | null;
        state: string | null;
        pincode: string;
        isCod: boolean;
    }>;
    findAll(city?: string, state?: string): Promise<{
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
    update(id: string, updateDto: UpdateServiceablePincodeDto): Promise<{
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
