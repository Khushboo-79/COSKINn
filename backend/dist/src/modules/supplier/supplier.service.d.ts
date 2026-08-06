import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';
export declare class SupplierService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateSupplierDto): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        gstin: string | null;
        contactPerson: string | null;
        paymentTerms: string | null;
    }>;
    findAll(status?: string): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        gstin: string | null;
        contactPerson: string | null;
        paymentTerms: string | null;
    }[]>;
    findOne(id: string): Promise<{
        purchaseOrders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            warehouseId: string;
            supplierId: string | null;
        }[];
    } & {
        id: string;
        email: string | null;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        gstin: string | null;
        contactPerson: string | null;
        paymentTerms: string | null;
    }>;
    update(id: string, data: UpdateSupplierDto): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        gstin: string | null;
        contactPerson: string | null;
        paymentTerms: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        address: string | null;
        gstin: string | null;
        contactPerson: string | null;
        paymentTerms: string | null;
    }>;
}
