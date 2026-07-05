import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    return this.brandService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}

