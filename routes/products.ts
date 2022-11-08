import { DIContainer } from "../inversify.config";
import { TYPES } from "../types";
import { IProduct, IProductService } from "../interfaces";

const productService = DIContainer.get<IProductService>(TYPES.ProductService);

async function productRoutes(fastify: {
  get(s: string, param2: (request: any, reply: any) => Promise<void>): void;
  post(s: string, param2: (request: any, reply: any) => Promise<void>): void;
  delete(s: string, param2: (request: any, reply: any) => Promise<void>): void;
}) {
  fastify.get("/products", async (request, reply) => {
    const response = await productService.getProducts();
    reply.send(response);
  });

  fastify.get("/products/:id", async (request, reply) => {
    const id = request.params.id;
    //TODO walidacja id
    if (id) {
      const response = await productService.getProductById(id);
      if (response) {
        reply.send(response);
      } else {
        reply.status(404).send("Cannot find product");
      }
    } else {
      reply.status(400).send("ID not provided");
    }
  });

  fastify.post("/products", async (request, reply) => {
    const { name, price } = request.body;

    const response = await productService.createProduct({ name, price });
    reply.send(response);
  });

  fastify.delete("/products/:id", async (request, reply) => {
    const id = request.params.id;
    const response = await productService.deleteProduct(id);
    if (response) {
      reply.send(response);
    } else {
      reply.status(404).send("Cannot find product to delete");
    }
  });
}

export default productRoutes;
