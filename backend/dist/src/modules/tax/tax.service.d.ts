import { PrismaService } from '../../prisma/prisma.service';
export declare class TaxService {
    private prisma;
    constructor(prisma: PrismaService);
    getHsnCodes(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        code: string;
    }[]>;
    createHsnCode(code: string, description?: string): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        code: string;
    }>;
    getTaxRates(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        cgst: number;
        sgst: number;
        igst: number;
    }[]>;
    createTaxRate(name: string, cgst: number, sgst: number, igst: number): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        cgst: number;
        sgst: number;
        igst: number;
    }>;
}
