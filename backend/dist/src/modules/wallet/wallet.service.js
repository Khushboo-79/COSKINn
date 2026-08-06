"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WalletService = class WalletService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWallet(userId) {
        let wallet = await this.prisma.wallet.findUnique({
            where: { userId },
            include: { transactions: true },
        });
        if (!wallet) {
            wallet = await this.prisma.wallet.create({
                data: { userId },
                include: { transactions: true },
            });
        }
        return wallet;
    }
    async getAdminTransactions() {
        return this.prisma.walletTransaction.findMany({
            include: {
                wallet: {
                    include: {
                        user: { select: { id: true, firstName: true, email: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async creditWallet(userId, amount, reference, txClient) {
        if (amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const prisma = txClient || this.prisma;
        let wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet) {
            wallet = await prisma.wallet.create({ data: { userId } });
        }
        return prisma.$transaction(async (tx) => {
            const updatedWallet = await tx.wallet.update({
                where: { id: wallet.id },
                data: { balance: { increment: amount } },
            });
            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 6);
            await tx.walletTransaction.create({
                data: {
                    walletId: wallet.id,
                    type: 'CREDIT',
                    amount,
                    reference,
                    expiresAt
                }
            });
            return updatedWallet;
        });
    }
    async debitWallet(userId, amount, reference, txClient) {
        if (amount <= 0)
            throw new common_1.BadRequestException('Amount must be positive');
        const prisma = txClient || this.prisma;
        const wallet = await prisma.wallet.findUnique({ where: { userId } });
        if (!wallet)
            throw new common_1.NotFoundException('Wallet not found');
        if (wallet.balance < amount) {
            throw new common_1.BadRequestException('Insufficient wallet balance');
        }
        return prisma.$transaction(async (tx) => {
            const updatedWallet = await tx.wallet.update({
                where: { id: wallet.id },
                data: { balance: { decrement: amount } },
            });
            await tx.walletTransaction.create({
                data: {
                    walletId: wallet.id,
                    type: 'DEBIT',
                    amount,
                    reference,
                },
            });
            return updatedWallet;
        });
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map