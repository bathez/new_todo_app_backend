import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { Product, User } from '@prisma/client';
import { Request } from 'express';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addProductToCart(@Req() req: Request, @Body() procduct: Product){
    console.log(req.user);
    const user: User = req.user as User;
    return this.cartService.addNewProductToCart(procduct, user, 5);

  }

  @Get()
  getUsersCart(@Req() req: Request) {
    const user: User = req.user as User;
    return this.cartService.getUserCart(user.id);
  }
}
