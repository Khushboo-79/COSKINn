import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(@Query('platform') platform?: 'COSMETICS' | 'SKINCARE') {
    return this.categoryService.findAllCategories(platform);
  }

  @Get(':id')
  async findCategory(@Param('id') id: string) {
    return this.categoryService.findCategory(id);
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }

  @Post('subcategories')
  async createSubcategory(@Body() dto: CreateSubcategoryDto) {
    return this.categoryService.createSubcategory(dto);
  }

  @Put('subcategories/:id')
  async updateSubcategory(@Param('id') id: string, @Body() dto: UpdateSubcategoryDto) {
    return this.categoryService.updateSubcategory(id, dto);
  }

  @Delete('subcategories/:id')
  async removeSubcategory(@Param('id') id: string) {
    return this.categoryService.removeSubcategory(id);
  }
}

