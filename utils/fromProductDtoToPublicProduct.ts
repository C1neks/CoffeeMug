import { HydratedDocument } from "mongoose";
import { IProduct } from "../interfaces";

type HydratedDocumentWithTimeStamp<T> = HydratedDocument<T> & {
  updatedAt: Date;
};

type ProductDTO = HydratedDocumentWithTimeStamp<IProduct>;

export const fromProductDtoToPublicProduct = (
  resource: ProductDTO | ProductDTO[]
): IProduct | IProduct[] => {
  if (Array.isArray(resource)) {
    return resource.map((item) => {
      return {
        id: item._id as unknown as string,
        name: item.name,
        price: item.price,
        updateDate: item.updatedAt,
      };
    });
  } else {
    return {
      id: resource._id as unknown as string,
      name: resource.name,
      price: resource.price,
      updateDate: resource.updatedAt,
    };
  }
};
