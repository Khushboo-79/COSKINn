import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';

@Controller('supplier')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'PURCHASE_MANAGER')
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'PURCHASE_MANAGER')
  findAll(@Query('status') status?: string) {
    return this.supplierService.findAll(status);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'PURCHASE_MANAGER')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN', 'PURCHASE_MANAGER')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
