import { model, Schema } from "mongoose";
import { IProduct } from "../interfaces/interfaces";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, maxLength: 100 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
