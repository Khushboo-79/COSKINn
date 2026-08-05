import { InventoryService } from './inventory.service';
export declare class InventoryCronService {
    private readonly inventoryService;
    private readonly logger;
    constructor(inventoryService: InventoryService);
    handleLowStockAlerts(): Promise<void>;
    handleNearExpiryAlerts(): Promise<void>;
}
