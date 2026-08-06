export declare class CreateSupplierDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    gstin?: string;
    pan?: string;
}
export declare class UpdateSupplierDto {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    gstin?: string;
    pan?: string;
    status?: 'ACTIVE' | 'INACTIVE';
}
