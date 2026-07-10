import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
const PDFDocument = require('pdfkit');

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async generateGstInvoice(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        address: true,
        user: true,
        gstInvoice: true
      }
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.gstInvoice) return order.gstInvoice;

    // Make sure public/invoices exists
    const dir = path.join(process.cwd(), 'public', 'invoices');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const invoiceNumber = `GST-INV-${Date.now()}`;
    const filename = `${invoiceNumber}.pdf`;
    const filePath = path.join(dir, filename);
    const publicUrl = `/invoices/${filename}`;

    // Simple 18% assumption for demo, in production we would map HSN -> TaxRate
    const totalTax = order.finalAmount * 0.18; 

    // Generate PDF using PDFKit
    await new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);
      doc.fontSize(20).text('COSKINn', { align: 'center' });
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
        pdfUrl: publicUrl
      }
    });
  }

  async createCreditNote(invoiceId: string, amount: number, reason: string) {
    return this.prisma.creditNote.create({
      data: {
        invoiceId,
        noteNumber: `CN-${Date.now()}`,
        amount,
        reason
      }
    });
  }

  async createDebitNote(invoiceId: string, amount: number, reason: string) {
    return this.prisma.debitNote.create({
      data: {
        invoiceId,
        noteNumber: `DN-${Date.now()}`,
        amount,
        reason
      }
    });
  }
}
