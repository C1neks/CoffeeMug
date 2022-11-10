import { DIContainer } from "../inversify.config";
import { TYPES } from "../types";
import { IProduct, IProductService } from "../interfaces/interfaces";
import { FastifyInstance, FastifyReply } from "fastify";

const productService = DIContainer.get<IProductService>(TYPES.ProductService);

const successOrFail = (returnObject: unknown | null, reply: FastifyReply) => {
  if (returnObject) {
    reply.send(returnObject);
  } else {
    reply.status(404).send("Resource not found");
  }
};

async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/products", async (request, reply) => {
    const response = await productService.getProducts();
    successOrFail(response, reply);
  });

  fastify.get<{
    Params: { id: string };
  }>("/products/:id", async (request, reply) => {
    const id = request.params.id;
    if (!id) return reply.status(400).send("ID not provided");

    const response = await productService.getProductById(id);
    successOrFail(response, reply);
  });

  fastify.post<{
    Body: { name: string; price: number };
  }>("/products", async (request, reply) => {
    const { name, price } = request.body;

    const response = await productService.createProduct({ name, price });
    successOrFail(response, reply);
  });

  fastify.delete<{
    Params: { id: string };
  }>("/products/:id", async (request, reply) => {
    const id = request.params.id;
    const response = await productService.deleteProduct(id);
    successOrFail(response, reply);
  });

  fastify.put<{
    Params: { id: string };
    Body: IProduct;
  }>("/products/:id", async (request, reply) => {
    const id = request.params.id;
    if (!id) return reply.status(400).send("ID not provided");

    const body = request.body;
    const response = await productService.updateProduct(id, body);
    successOrFail(response, reply);
  });
}

export default productRoutes;
