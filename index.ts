import "reflect-metadata";
import "dotenv/config";
import fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import productRoutes from "./routes/products";

const server: FastifyInstance = fastify({ logger: true });

server.register(productRoutes);

const start = async () => {
  await mongoose.connect(process.env.MONGODB_URL!);

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

start();
