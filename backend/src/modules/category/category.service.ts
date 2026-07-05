import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Category Methods
  async findAllCategories() {
    return this.prisma.category.findMany({
      where: { isDeleted: false },
      include: { subcategories: true },
      orderBy: { name: 'asc' },
    });
  }

  async findCategory(id: string) {
    const cat = await this.prisma.category.findUnique({
      where: { id },
      include: { subcategories: true },
    });
    if (!cat || cat.isDeleted) throw new NotFoundException('Category not found');
    return cat;
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    await this.findCategory(id);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async removeCategory(id: string) {
    await this.findCategory(id);
    return this.prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  // Subcategory Methods
  async createSubcategory(dto: CreateSubcategoryDto) {
    await this.findCategory(dto.categoryId);
    return this.prisma.subcategory.create({ data: dto });
  }

  async updateSubcategory(id: string, dto: UpdateSubcategoryDto) {
    const sub = await this.prisma.subcategory.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('Subcategory not found');
    return this.prisma.subcategory.update({ where: { id }, data: dto });
  }

  async removeSubcategory(id: string) {
    const sub = await this.prisma.subcategory.findUnique({ where: { id } });
    if (!sub) throw new NotFoundException('Subcategory not found');
    return this.prisma.subcategory.delete({ where: { id } });
  }
}

