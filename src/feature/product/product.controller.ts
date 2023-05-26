import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductModel } from './model/product.model';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly prodService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.prodService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.prodService.getProductById(id);
  }

  @Post('/create')
  addNewProduct(@Body() product: Product) {
    return this.prodService.addNewProduct(product)
  }
}
