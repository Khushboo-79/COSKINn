import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('support')
@UseGuards(JwtAuthGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('contact')
  createContactTicket(
    @Request() req,
    @Body() body: { subject: string; message: string; priority?: string }
  ) {
    return this.supportService.createContactTicket(req.user.id, body.subject, body.message, body.priority);
  }

  @Post('tickets')
  createTicket(@Request() req, @Body() body: { subject: string; priority?: string }) {
    return this.supportService.createTicket(req.user.id, body.subject, body.priority);
  }

  @Get('tickets/:id/messages')
  getTicketMessages(@Param('id') ticketId: string) {
    return this.supportService.getTicketMessages(ticketId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Get('admin/tickets')
  getTickets(@Query('status') status?: string) {
    return this.supportService.getTickets(status);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Post('admin/tickets/:id/close')
  closeTicket(@Param('id') ticketId: string) {
    return this.supportService.closeTicket(ticketId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Post('admin/tickets/:id/reply')
  replyToTicket(@Param('id') ticketId: string, @Body() body: { adminId: string; message: string }) {
    return this.supportService.addMessage(ticketId, body.adminId, 'ADMIN', body.message);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Post('admin/tickets/:id/escalate')
  escalateTicket(@Param('id') ticketId: string) {
    return this.supportService.escalateTicket(ticketId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Post('admin/tickets/:id/assign')
  assignTicket(@Param('id') ticketId: string, @Body() body: { adminId: string }) {
    return this.supportService.assignTicket(ticketId, body.adminId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Get('admin/tickets/stats/sla')
  getSlaStats() {
    return this.supportService.getSlaStats();
  }
}

