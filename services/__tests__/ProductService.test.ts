import "reflect-metadata";

import { TYPES } from "../../types";
import { ProductService } from "../productService";

import { IProductRepository, IProductService } from "../../interfaces";

import { DIContainer } from "../../inversify.config";

describe("ProductService", () => {
  const productService = DIContainer.get<IProductService>(TYPES.ProductService);

  // const createTestProduct = async () => {
  //   const result = await productService.createProduct({
  //     name: "testproduct",
  //     price: 65,
  //   });
  //   console.log(result);
  // };
  it("should return empty array of products on new db", async () => {
    expect(await productService.getProducts()).toEqual([]);
  });
});
