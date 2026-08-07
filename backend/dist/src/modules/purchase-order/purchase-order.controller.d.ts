import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto, CreateGrnDto } from './dto/purchase-order.dto';
export declare class PurchaseOrderController {
    private readonly purchaseOrderService;
    constructor(purchaseOrderService: PurchaseOrderService);
    create(dto: CreatePurchaseOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    findAll(): Promise<({
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            address: string | null;
        };
        supplier: {
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
        } | null;
        grns: {
            id: string;
            createdAt: Date;
            purchaseOrderId: string;
            receivedDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            address: string | null;
        };
        supplier: {
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
        } | null;
        grns: {
            id: string;
            createdAt: Date;
            purchaseOrderId: string;
            receivedDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    createGrn(id: string, dto: Omit<CreateGrnDto, 'purchaseOrderId'>): Promise<{
        id: string;
        createdAt: Date;
        purchaseOrderId: string;
        receivedDate: Date;
    }>;
}
