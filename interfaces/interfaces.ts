import { HydratedDocument, SchemaTimestampsConfig } from "mongoose";

export type HydratedDocumentWithTimeStamp<T> = HydratedDocument<T> &
  SchemaTimestampsConfig;
export type IProductDB = HydratedDocumentWithTimeStamp<IProduct>;
export interface IProduct {
  id?: string;
  name: string;
  price: number;
  updateDate?: string | boolean;
}

export interface IProductRepository {
  getItems(): Promise<HydratedDocumentWithTimeStamp<IProduct>[]>;
  getItemById(
    id: string
  ): Promise<HydratedDocumentWithTimeStamp<IProduct> | null>;
  createItem(item: any): Promise<HydratedDocumentWithTimeStamp<IProduct>>;
  deleteItem(
    id: string
  ): Promise<HydratedDocumentWithTimeStamp<IProduct> | null>;
  updateItem(
    id: string,
    body: IProduct
  ): Promise<HydratedDocumentWithTimeStamp<IProduct> | null>;
}

export interface IProductService {
  getProducts(): Promise<IProduct[]>;
  getProductById(id: any): Promise<IProduct>;
  createProduct(product: IProduct): Promise<IProduct>;
  deleteProduct(id: string): Promise<IProduct>;
  updateProduct(id: string, body: IProduct): Promise<IProduct>;
}
