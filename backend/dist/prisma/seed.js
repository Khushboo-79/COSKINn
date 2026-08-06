"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter, log: ['error'] });
async function main() {
    console.log('Seeding database...');
    const roles = [
        'SUPER_ADMIN',
        'PRODUCT_MANAGER',
        'AUDITOR',
        'FINANCE_MANAGER',
        'INVENTORY_MANAGER',
        'ORDER_MANAGER',
        'WAREHOUSE_MANAGER',
        'SUPPORT_AGENT',
        'MARKETING_MANAGER',
        'CONTENT_MANAGER',
        'HR_MANAGER'
    ];
    for (const roleName of roles) {
        await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: { name: roleName, description: `${roleName} role` },
        });
    }
    console.log('Roles created or already exist.');
    const adminEmail = 'admin@fairenne.com';
    const superAdminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
    if (superAdminRole) {
        const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
        if (!existingAdmin) {
            const passwordHash = await bcrypt.hash('admin123', 10);
            const admin = await prisma.user.create({
                data: {
                    email: adminEmail,
                    phone: '+919039567767',
                    firstName: 'Super',
                    lastName: 'Admin',
                    passwordHash,
                    roles: {
                        create: {
                            roleId: superAdminRole.id
                        }
                    }
                }
            });
            console.log('Super Admin user created:', admin.email);
        }
        else {
            await prisma.user.update({
                where: { email: adminEmail },
                data: { phone: '+919039567767' }
            });
            console.log('Super Admin user already exists, updated phone number for:', existingAdmin.email);
        }
    }
    console.log('Seeding completed.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map