import { inject, injectable } from "inversify";

import { TYPES } from "../types";
import { IProduct, IProductRepository } from "../interfaces";

@injectable()
export class ProductService {
  @inject(TYPES.ProductRepository) private repository!: IProductRepository;

  async getProducts() {
    const itemsFromDB = await this.repository.getItems();
    return itemsFromDB.map((item) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price,
      };
    });
  }

  async getProductById(id: string) {
    const productFromDB = await this.repository.getItemById(id);
    if (productFromDB) {
      return {
        id: productFromDB._id,
        name: productFromDB.name,
        price: productFromDB.price,
      };
    }
  }

  async createProduct(product: IProduct) {
    const createdProductFromDB = await this.repository.createItem(product);
    return {
      id: createdProductFromDB._id,
      name: createdProductFromDB.name,
      price: createdProductFromDB.price,
    };
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.repository.deleteItem(id);
    return deletedProduct;
  }
}
