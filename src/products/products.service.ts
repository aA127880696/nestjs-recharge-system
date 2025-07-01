import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  private products: any[] = [];
  private nextId = 1;

  create(productDto: CreateProductDto) {
    const newProduct = {
      id: this.nextId++,
      ...productDto,
    };
    this.products.push(newProduct);
    return {
      message: '新增商品成功',
      product: newProduct,
    };
  }

  findAll(keyword?: string) {
    if (keyword) {
      return this.products.filter((p) => p.name?.includes(keyword));
    }
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的商品`);
    }
    return product;
  }

  update(id: number, updateDto: UpdateProductDto) {
    const product = this.findOne(id);
    const updatedProduct = { ...product, ...updateDto };
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = updatedProduct;

    return {
      message: '商品更新成功',
      product: updatedProduct,
    };
  }

  delete(id: number) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`找不到 ID 為 ${id} 的商品`);
    }
    const deleted = this.products.splice(index, 1);
    return {
      message: '商品已刪除',
      product: deleted[0],
    };
  }
}