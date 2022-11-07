import { HydratedDocument } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
}

export interface IProductRepository {
  getItems(): Promise<HydratedDocument<IProduct>[]>;
  createItem(item: any): Promise<HydratedDocument<IProduct>>;
}

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
  createProduct(product: IProduct): Promise<IProduct>;
}
