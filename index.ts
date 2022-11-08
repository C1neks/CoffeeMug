import "reflect-metadata";
import fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import "dotenv/config";

import productRoutes from "./routes/products";
const server: FastifyInstance = fastify({ logger: true });

server.get("/", async (request, reply) => {
  return "Hello World";
});

server.register(productRoutes);

const connectionToDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL!)
    .catch((error) => console.log(error.message));
};

connectionToDB();

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
