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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const PDFDocument = require('pdfkit');
let InvoiceService = class InvoiceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateGstInvoice(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: { include: { variant: { include: { product: true } } } },
                address: true,
                user: true,
                gstInvoice: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.gstInvoice)
            return order.gstInvoice;
        const dir = path.join(process.cwd(), 'public', 'invoices');
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });
        const invoiceNumber = `GST-INV-${Date.now()}`;
        const filename = `${invoiceNumber}.pdf`;
        const filePath = path.join(dir, filename);
        const publicUrl = `/invoices/${filename}`;
        const totalTax = order.finalAmount * 0.18;
        await new Promise((resolve, reject) => {
            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            doc.fontSize(20).text('Fairenne', { align: 'center' });
            doc.fontSize(10).text('GST TAX INVOICE', { align: 'center' }).moveDown();
            doc.fontSize(12).text(`Invoice No: ${invoiceNumber}`);
            doc.text(`Order ID: ${order.id}`);
            doc.text(`Date: ${new Date().toLocaleDateString()}`).moveDown();
            doc.text(`Total Tax (18%): Rs. ${totalTax.toFixed(2)}`);
            doc.text(`Final Amount: Rs. ${order.finalAmount.toFixed(2)}`);
            doc.end();
            stream.on('finish', resolve);
            stream.on('error', reject);
        });
        return this.prisma.gstInvoice.create({
            data: {
                orderId,
                invoiceNumber,
                totalTax,
                totalAmount: order.finalAmount,
                pdfUrl: publicUrl,
            },
        });
    }
    async createCreditNote(invoiceId, amount, reason) {
        return this.prisma.creditNote.create({
            data: {
                invoiceId,
                noteNumber: `CN-${Date.now()}`,
                amount,
                reason,
            },
        });
    }
    async createDebitNote(invoiceId, amount, reason) {
        return this.prisma.debitNote.create({
            data: {
                invoiceId,
                noteNumber: `DN-${Date.now()}`,
                amount,
                reason,
            },
        });
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map