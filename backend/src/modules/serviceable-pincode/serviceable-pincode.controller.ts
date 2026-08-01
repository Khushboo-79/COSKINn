import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ServiceablePincodeService } from './serviceable-pincode.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateServiceablePincodeDto, UpdateServiceablePincodeDto } from './dto/serviceable-pincode.dto';

@Controller('serviceable-pincode')
export class ServiceablePincodeController {
  constructor(private readonly pincodeService: ServiceablePincodeService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONS_MANAGER')
  create(@Body() createDto: CreateServiceablePincodeDto) {
    return this.pincodeService.create(createDto);
  }

  @Get()
  findAll(@Query('city') city?: string, @Query('state') state?: string) {
    return this.pincodeService.findAll({ city, state });
  }

  @Get('check/:code')
  checkServiceability(@Param('code') code: string) {
    return this.pincodeService.checkServiceability(code);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONS_MANAGER')
  findOne(@Param('id') id: string) {
    return this.pincodeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONS_MANAGER')
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceablePincodeDto) {
    return this.pincodeService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  remove(@Param('id') id: string) {
    return this.pincodeService.remove(id);
  }
}
