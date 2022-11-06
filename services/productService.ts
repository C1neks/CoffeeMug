import { inject, injectable } from "inversify";

import { TYPES } from "../types";
import { IProduct, IProductRepository } from "../interfaces";

@injectable()
export class ProductService {
  @inject(TYPES.ProductRepository) private repository!: IProductRepository;

  async getProducts() {
    return this.repository.getItems();
  }

  async createProduct(product: IProduct) {
    const createdProduct = await this.repository.createItem(product);
    return createdProduct;
  }
}
