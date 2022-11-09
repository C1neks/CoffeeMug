import { IProduct, IProductDB } from "../interfaces/interfaces";

const toPublicProduct = (item: IProductDB): IProduct => ({
  id: item._id.toString(),
  name: item.name,
  price: item.price,
  updateDate: item.updatedAt,
});

export const fromProductDbToProductDto = (
  resource: IProductDB | IProductDB[]
): IProduct | IProduct[] => {
  if (Array.isArray(resource)) {
    return resource.map((item) => toPublicProduct(item));
  } else {
    return toPublicProduct(resource);
  }
};
