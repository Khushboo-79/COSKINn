import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('products')
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) {}

  // --- REVIEWS ---

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string) {
    return this.engagementService.getProductReviews(id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  async addReview(@Param('id') id: string, @Body() body: { rating: number, title?: string, content?: string }, @Request() req: any) {
    return this.engagementService.addReview(req.user.userId, id, body);
  }

  // --- Q&A ---

  @Get(':id/questions')
  async getQuestions(@Param('id') id: string) {
    return this.engagementService.getProductQuestions(id);
  }

  @Post(':id/questions')
  @UseGuards(JwtAuthGuard)
  async addQuestion(@Param('id') id: string, @Body('content') content: string, @Request() req: any) {
    return this.engagementService.addQuestion(req.user.userId, id, content);
  }
}
