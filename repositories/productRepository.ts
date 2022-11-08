import { injectable } from "inversify";
import { HydratedDocument } from "mongoose";
import { IProduct, IProductRepository } from "../interfaces";

import ProductModel from "../models/productModel";

@injectable()
export class ProductRepository implements IProductRepository {
  private product: typeof ProductModel;
  constructor() {
    this.product = ProductModel;
  }

  async getItems() {
    const res: HydratedDocument<IProduct>[] = await this.product.find();

    return res;
  }

  async getItemById(id: any) {
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
    return this.product.findOneAndUpdate(
      { _id: id },
      { ...{ $set: body } },
      {
        new: true,
      }
    );
  }
}
