import { Container, injectable } from "inversify";
import { TYPES } from "./types";

import { IProductRepository } from "./interfaces";
import { ProductService } from "./services/productService";

import { ProductRepository } from "./repositories/productRepository";

const DIContainer = new Container();

DIContainer.bind<IProductRepository>(TYPES.ProductRepository).to(
  ProductRepository
);
DIContainer.bind<any>(TYPES.ProductService).to(ProductService);

export { DIContainer };
