"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@fairenne.com' } });
    console.log(admin ? `Found: ${admin.email}, pass: ${admin.passwordHash}` : 'Not found');
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=check-admin.js.map