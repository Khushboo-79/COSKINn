import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceablePincodeDto, UpdateServiceablePincodeDto } from './dto/serviceable-pincode.dto';

@Injectable()
export class ServiceablePincodeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateServiceablePincodeDto) {
    return this.prisma.serviceablePincode.create({
      data: {
        pincode: data.code,
        city: data.city,
        state: data.state,
        isActive: data.isActive
      },
    });
  }

  async findAll(filters: { city?: string; state?: string }) {
    const where: any = {};
    if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters.state) where.state = { contains: filters.state, mode: 'insensitive' };

    return this.prisma.serviceablePincode.findMany({ where });
  }

  async checkServiceability(code: string) {
    const pincode = await this.prisma.serviceablePincode.findUnique({
      where: { pincode: code },
    });
    return {
      serviceable: !!(pincode && pincode.isActive),
      details: pincode || null,
    };
  }

  async findOne(id: string) {
    const pincode = await this.prisma.serviceablePincode.findUnique({ where: { id } });
    if (!pincode) throw new NotFoundException('Pincode not found');
    return pincode;
  }

  async update(id: string, data: UpdateServiceablePincodeDto) {
    await this.findOne(id);
    return this.prisma.serviceablePincode.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.serviceablePincode.delete({
      where: { id },
    });
  }
}
