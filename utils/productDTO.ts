import { HydratedDocument } from "mongoose";
import { IProduct } from "../interfaces";
type productDTO = (
  resource: HydratedDocument<IProduct> | HydratedDocument<IProduct>[]
) => Promise<IProduct[] | IProduct>;

export const productDTO: productDTO = async (resource) => {
  if (Array.isArray(resource)) {
    return resource.map((item) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price,
      };
    });
  } else {
    return {
      id: resource._id,
      name: resource.name,
      price: resource.price,
    };
  }
};
