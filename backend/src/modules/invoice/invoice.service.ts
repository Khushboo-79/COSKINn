import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
const PDFDocument = require('pdfkit');

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async generateInvoice(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        address: true,
        user: true
      }
    });

    if (!order) throw new NotFoundException('Order not found');

    // Make sure public/invoices exists
    const dir = path.join(process.cwd(), 'public', 'invoices');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filename = `invoice_${orderId}.pdf`;
    const filePath = path.join(dir, filename);
    const publicUrl = `/invoices/${filename}`;

    // If invoice already exists in DB, just return it
    const existingInvoice = await this.prisma.orderInvoice.findFirst({
      where: { orderId }
    });

    if (existingInvoice) {
      return existingInvoice;
    }

    // Generate PDF using PDFKit
    await new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);

      // Company Header
      doc.fontSize(20).text('COSKINn', { align: 'center' });
      doc.fontSize(10).text('TAX INVOICE', { align: 'center' }).moveDown();

      // Order Details
      doc.fontSize(12).text(`Order ID: ${order.id}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Status: ${order.status}`);
      doc.text(`Payment Mode: ${order.paymentMode}`).moveDown();

      // Customer Details
      if (order.address) {
        doc.text('Billed To:');
        doc.text(`${order.address.fullName}`);
        doc.text(`${order.address.addressLine1}, ${order.address.addressLine2 || ''}`);
        doc.text(`${order.address.city}, ${order.address.state} - ${order.address.pincode}`);
        doc.text(`Phone: ${order.address.phone}`).moveDown();
      }

      // Line Items Header
      doc.text('------------------------------------------------------------------');
      doc.text('Item                                 Qty      Price      Total');
      doc.text('------------------------------------------------------------------');

      // Line Items
      order.items.forEach(item => {
        const title = item.variant?.product?.name?.substring(0, 30) || 'Product';
        const qty = item.quantity.toString().padStart(3);
        const price = item.price.toFixed(2).padStart(10);
        const total = (item.price * item.quantity).toFixed(2).padStart(10);
        doc.text(`${title.padEnd(32)} ${qty} ${price} ${total}`);
      });
      doc.text('------------------------------------------------------------------').moveDown();

      // Summary
      doc.text(`Total Amount: Rs. ${order.totalAmount.toFixed(2)}`, { align: 'right' });
      doc.text(`Discount: Rs. ${order.discountAmt.toFixed(2)}`, { align: 'right' });
      doc.text(`Final Amount: Rs. ${order.finalAmount.toFixed(2)}`, { align: 'right' });

      doc.end();

      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    // Save to database
    const invoice = await this.prisma.orderInvoice.create({
      data: {
        orderId: order.id,
        invoiceNum: `INV-${Date.now()}`,
        pdfUrl: publicUrl
      }
    });

    return invoice;
  }
}
