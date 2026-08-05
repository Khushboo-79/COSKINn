import { InvoiceService } from './invoice.service';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    getInvoice(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        totalAmount: number;
        orderId: string;
        invoiceNumber: string;
        totalTax: number;
        pdfUrl: string | null;
    }>;
    createCreditNote(invoiceId: string, amount: number, reason: string): Promise<{
        id: string;
        createdAt: Date;
        reason: string;
        amount: number;
        noteNumber: string;
        invoiceId: string;
    }>;
    createDebitNote(invoiceId: string, amount: number, reason: string): Promise<{
        id: string;
        createdAt: Date;
        reason: string;
        amount: number;
        noteNumber: string;
        invoiceId: string;
    }>;
}
