import { Document } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
}

export interface IProductDB extends Document, IProduct {}

export interface IProductRepository {
  getItems(): Promise<IProductDB[]>;
  createItem(item: any): Promise<IProductDB>;
}

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
  createProduct(product: IProduct): Promise<IProduct>;
}
