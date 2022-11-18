import { IProduct } from "../interfaces/interfaces";

export const bodyValidation = async (product: IProduct) => {
  if (product.name && product.name.length <= 100 && product.price) {
    return true;
  }
  return false;
};
