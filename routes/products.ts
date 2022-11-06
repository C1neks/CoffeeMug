import { ProductService } from "../services/productService";
import { DIContainer } from "../inversify.config";
import { TYPES } from "../types";
import { IProductService } from "../interfaces";

const productService = DIContainer.get<IProductService>(TYPES.ProductService);

async function productRoutes(
  fastify: {
    get: (
      arg0: string,
      arg1: (request: any, reply: any) => Promise<void>
    ) => void;
    post: (
      arg0: string,
      arg1: (request: any, reply: any) => Promise<void>
    ) => void;
  },
  options: any
) {
  fastify.get("/products", async (request, reply) => {
    const response = await productService.getProducts();
    reply.send(response);
  });

  fastify.post("/products", async (request, reply) => {
    const { name, price } = request.body;

    const response = await productService.createProduct({ name, price });

    reply.send(response);
  });
}

export default productRoutes;
