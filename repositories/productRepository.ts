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

  async createItem(item: any) {
    const newItem = new this.product(item);

    return newItem.save();
  }
}
