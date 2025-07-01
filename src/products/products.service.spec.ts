import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: '原神 60 創世結晶',
      price: 0.99,
      amount: 60,
      currency: 'USD',
      isHot: true,
    },
  ];

  findAll() {
    return this.products;
  }

  create(product: any) {
    this.products.push(product);
    return product;
  }
}
