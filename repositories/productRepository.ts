import { injectable } from "inversify";

import { Model, model, Schema } from "mongoose";
import { IProduct, IProductDB, IProductRepository } from "../interfaces";

@injectable()
export class ProductRepository implements IProductRepository {
  private model: Model<IProduct>;
  constructor() {
    const productSchema = new Schema<IProduct>({
      name: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
    });

    this.model = model("Product", productSchema);
  }

  async getItems() {
    const res: IProductDB[] = await this.model.find();

    return res;
  }

  async createItem(item: any) {
    const newItem = new this.model(item);

    return newItem.save();
  }
}
