import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ReturnService } from './return.service';
import { RequestReturnDto, ProcessReturnDto, ReturnQcDto } from './dto/return.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request')
  requestReturn(@Body() dto: RequestReturnDto, @Request() req) {
    return this.returnService.requestReturn(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CUSTOMER_SUPPORT')
  @Get()
  findAll(@Query('status') status?: string) {
    return this.returnService.findAll(status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CUSTOMER_SUPPORT')
  @Put(':id/process')
  processReturn(@Param('id') id: string, @Body() dto: ProcessReturnDto) {
    return this.returnService.processReturn(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF')
  @Post(':id/qc')
  processQC(@Param('id') id: string, @Body() dto: ReturnQcDto) {
    return this.returnService.processQC(id, dto);
  }
}
