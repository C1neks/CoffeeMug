import { Container } from "inversify";
import { TYPES } from "./types";

import { IProductRepository } from "./interfaces/interfaces";
import { ProductService } from "./services/productService";

import { ProductRepository } from "./repositories/productRepository";
import Product from "./models/productModel";

const DIContainer = new Container();

DIContainer.bind<any>(TYPES.Product).toConstantValue(Product);
DIContainer.bind<IProductRepository>(TYPES.ProductRepository).to(
  ProductRepository
);
DIContainer.bind<any>(TYPES.ProductService).to(ProductService);

export { DIContainer };
