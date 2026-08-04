import { TaxService } from './tax.service';
export declare class TaxController {
    private readonly taxService;
    constructor(taxService: TaxService);
    getHsnCodes(): Promise<{
        id: string;
        createdAt: Date;
        description: string | null;
        code: string;
    }[]>;
    createHsnCode(body: {
        code: string;
        description?: string;
    }): Promise<{
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
    createTaxRate(body: {
        name: string;
        cgst: number;
        sgst: number;
        igst: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        cgst: number;
        sgst: number;
        igst: number;
    }>;
}
