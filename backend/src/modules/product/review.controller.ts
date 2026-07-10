import { Controller, Get, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('product-review')
export class ReviewController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  async findAll(@Query('search') search?: string, @Query('status') status?: string) {
    const where: any = {};
    
    if (status === 'PENDING') where.isApproved = false;
    if (status === 'APPROVED') where.isApproved = true;
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { product: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    return this.prisma.productReview.findMany({
      where,
      include: {
        product: { select: { name: true, images: true } },
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  async approveReview(@Param('id') id: string) {
    return this.prisma.productReview.update({
      where: { id },
      data: { isApproved: true },
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  async deleteReview(@Param('id') id: string) {
    return this.prisma.productReview.delete({
      where: { id },
    });
  }
}
