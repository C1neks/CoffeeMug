import { inject, injectable } from "inversify";
import { IProduct, IProductRepository } from "../interfaces/interfaces";

import { TYPES } from "../types";
import Product from "../models/productModel";

@injectable()
export class ProductRepository implements IProductRepository {
  @inject(TYPES.Product) private product!: typeof Product;

  async getItems() {
    const res = await this.product.find();

    return res;
  }

  async getItemById(id: string) {
    return this.product.findById(id);
  }

  async createItem(item: string) {
    const newItem = new this.product(item);

    return newItem.save();
  }

  async deleteItem(id: string) {
    return this.product.findOneAndDelete({ _id: id });
  }

  async updateItem(id: string, body: IProduct) {
    // await this.product.validate(body) // validate manually because findOneAndUpdate doesn't do validation
    return this.product.findOneAndUpdate(
      { _id: id },
      { $set: body },
      {
        new: true,
        upsert: true,
      }
    );
  }
}
