import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('support/tickets')
  createTicket(@Body() body: { userId: string; subject: string; priority?: string }) {
    return this.supportService.createTicket(body.userId, body.subject, body.priority);
  }

  @Get('support/tickets/:id/messages')
  getTicketMessages(@Param('id') ticketId: string) {
    return this.supportService.getTicketMessages(ticketId);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Get('admin/support/tickets')
  getTickets(@Query('status') status?: string) {
    return this.supportService.getTickets(status);
  }

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'SUPPORT')
  @Post('admin/support/tickets/:id/close')
  closeTicket(@Param('id') ticketId: string) {
    return this.supportService.closeTicket(ticketId);
  }
}

