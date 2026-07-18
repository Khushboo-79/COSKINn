import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('compliance')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post('consent')
  recordConsent(@Request() req, @Body() data: { push: boolean; email: boolean; sms: boolean; whatsapp: boolean }) {
    return this.complianceService.recordConsent(req.user.id, data);
  }

  @Get('consent')
  getConsents(@Request() req) {
    return this.complianceService.getConsents(req.user.id);
  }

  @Post('data-request')
  createDataRequest(@Request() req, @Body() data: { requestType: 'EXPORT' | 'DELETE' }) {
    return this.complianceService.createDataRequest(req.user.id, data);
  }

  @Get('data-request')
  getDataRequests(@Request() req) {
    return this.complianceService.getDataRequests(req.user.id);
  }

  @Patch('data-request/:id/status')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'COMPLIANCE_OFFICER')
  updateDataRequestStatus(@Param('id') id: string, @Body() data: { status: 'PENDING' | 'PROCESSING' | 'FULFILLED' | 'REJECTED'; exceptions?: string }) {
    return this.complianceService.updateDataRequestStatus(id, data);
  }

  @Get('admin/data-requests')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'COMPLIANCE_OFFICER')
  getAllDataRequests() {
    return this.complianceService.getAllDataRequests();
  }
}
