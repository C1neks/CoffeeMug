import { inject, injectable } from "inversify";

import { TYPES } from "../types";
import { IProduct, IProductRepository } from "../interfaces";
import { productDTO } from "../utils/productDTO";

@injectable()
export class ProductService {
  @inject(TYPES.ProductRepository) private repository!: IProductRepository;

  async getProducts() {
    const itemsFromDB = await this.repository.getItems();
    const result = await productDTO(itemsFromDB);
    return result;
  }

  async getProductById(id: string) {
    const productFromDB = await this.repository.getItemById(id);
    if (productFromDB) {
      return productDTO(productFromDB);
    }
  }

  async createProduct(product: IProduct) {
    const productFromDB = await this.repository.createItem(product);

    return productDTO(productFromDB);
  }

  async deleteProduct(id: string) {
    const productFromDB = await this.repository.deleteItem(id);

    if (productFromDB) {
      return productDTO(productFromDB);
    }
  }

  async updateProduct(id: string, body: IProduct) {
    const productFromDB = await this.repository.updateItem(id, body);
    if (productFromDB) {
      return productDTO(productFromDB);
    }
  }
}
