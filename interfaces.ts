import { HydratedDocument } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  updatedAt?: Date;
}

export interface IProductRepository {
  getItems(): Promise<HydratedDocument<IProduct>[]>;
  getItemById(id: string): Promise<HydratedDocument<IProduct> | null>;
  createItem(item: any): Promise<HydratedDocument<IProduct>>;
  deleteItem(id: string): Promise<HydratedDocument<IProduct> | null>;
  updateItem(
    id: string,
    body: IProduct
  ): Promise<HydratedDocument<IProduct> | null>;
}

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
  getProductById(id: any): Promise<IProduct>;
  createProduct(product: IProduct): Promise<IProduct>;
  deleteProduct(id: string): Promise<IProduct>;
  updateProduct(id: string, body: IProduct): Promise<IProduct>;
}
