import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  addToCart(
    @Request() req,
    @Body('productId') productId: string,
    @Body('variantId') variantId?: string,
    @Body('quantity') quantity: number = 1
  ) {
    return this.cartService.addToCart(req.user.id, productId, variantId, quantity);
  }

  @Put('items/:id')
  updateCartItem(
    @Request() req,
    @Param('id') itemId: string,
    @Body('quantity') quantity: number
  ) {
    return this.cartService.updateCartItem(req.user.id, itemId, quantity);
  }

  @Delete('items/:id')
  removeFromCart(
    @Request() req,
    @Param('id') itemId: string
  ) {
    return this.cartService.removeFromCart(req.user.id, itemId);
  }
}
