import { model, Schema } from "mongoose";
import { IProduct } from "../interfaces/interfaces";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
