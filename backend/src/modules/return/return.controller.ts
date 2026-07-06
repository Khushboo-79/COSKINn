import { Controller, Get, Patch, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ReturnService } from './return.service';
import { UpdateReturnStatusDto, CreateMockReturnDto } from './dto/return.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('returns')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'CUSTOMER_SUPPORT')
  findAll(@Query('status') status?: string) {
    return this.returnService.findAll(status);
  }

  @Patch(':id/status')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'CUSTOMER_SUPPORT')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateReturnStatusDto) {
    return this.returnService.updateStatus(id, dto);
  }

  // Helper for testing
  @Post('test-mock')
  @Roles('SUPER_ADMIN')
  createMockReturn(@Body() dto: CreateMockReturnDto) {
    return this.returnService.createMockReturn(dto);
  }
}
