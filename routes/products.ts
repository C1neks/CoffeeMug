import { DIContainer } from "../inversify.config";
import { TYPES } from "../types";
import { IProduct, IProductService } from "../interfaces/interfaces";
import { FastifyInstance, FastifyReply } from "fastify";
import { bodyValidation } from "../utils/bodyValidation";

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
    const validation = await bodyValidation({ name, price });
    console.log(validation);
    if (validation) {
      const response = await productService.createProduct({ name, price });
      successOrFail(response, reply);
    }
    reply.status(400).send("Validation Error");
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
    const validation = await bodyValidation(body);
    if (validation) {
      const response = await productService.updateProduct(id, body);
      successOrFail(response, reply);
    }
    reply.status(400).send("Validation Error");
  });
}

export default productRoutes;
