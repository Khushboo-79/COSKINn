import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('consent')
  async updateConsent(@Req() req, @Body() body: any) {
    return this.complianceService.updateConsent(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('consent')
  async getConsent(@Req() req) {
    return this.complianceService.getConsent(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('data-request')
  async createDataRequest(@Req() req, @Body() body: { requestType: 'EXPORT' | 'DELETE' }) {
    return this.complianceService.createDataRequest(req.user.id, body.requestType);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get('admin/data-requests')
  async getAdminDataRequests() {
    return this.complianceService.getAdminDataRequests();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Patch('admin/data-requests/:id/status')
  async updateDataRequestStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.complianceService.updateDataRequestStatus(id, body.status);
  }
}
