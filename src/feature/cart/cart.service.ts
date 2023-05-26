import { Injectable } from '@nestjs/common';
import { Prisma, Product, User } from '@prisma/client';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService){}
  async addNewProductToCart(product: Product, user: User, qty: number){
    let cart = await this.prisma.cart.findFirst({
      where: {
        userId: user.id,
        isFullfilled: false,
      },
    });
    
    if(!cart){
      cart = await this.createNewCart(user.id);
    }

    cart = await this.prisma.cart.update({
      where: {id: cart.id},
      data: {
        CartProduct:{
          create: {
            productId: product.id,
            qty,
            pricePerUnit: product.price,
          },
        },
      },
    });

    return cart
  }

  private async createNewCart(userId: number){
    return await this.prisma.cart.create({
      data: {
        userId,
        isFullfilled: false
      },
    });
  }
  getUserCart(id: number) {
    const cart = this.prisma.cart.findFirst({
      where: {
        userId: id,
      },
      include: {
        CartProduct: {
          include: {
            product: true,
          },
        },
      },
    });
    return cart;
    // const rawData = fs.readFileSync(
    //   __dirname + '/../../../src/feature/cart/model/cart.json',
    //   'utf8',
    // );
    // console.log(id);
    // // fs.writeFileSync('mad.txt', 'Hello world');
    // return JSON.parse(rawData);
  }
  }
