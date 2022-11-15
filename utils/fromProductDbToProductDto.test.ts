import { fromProductDbToProductDto } from "./fromProductDbToProductDto";

import { Types } from "mongoose";
import { IProductDB } from "../interfaces/interfaces";

const testProduct: Partial<IProductDB> = {
  _id: new Types.ObjectId("507f1f77bcf86cd799439011"),
  name: "testProductName",
  price: 15,
};

const testProductAfterUpdate: Partial<IProductDB> = {
  _id: new Types.ObjectId("507f1f77bcf86cd799439019"),
  name: "testProductWithUpdateDate",
  price: 77,
  updatedAt: "2022-11-09T14:47:07.367Z",
};

const arrayOfTestProducts: Partial<IProductDB>[] = [
  {
    _id: new Types.ObjectId("407f1f27bcf66cd799439087"),
    name: "testProductName",
    price: 15,
  },
  {
    _id: new Types.ObjectId("307f1f27bcf66cd794439081"),
    name: "testProductName2",
    price: 85,
  },
];

describe("tests fromProductDbToProductDto function", () => {
  it("should return single productDto", () => {
    const result = fromProductDbToProductDto(testProduct as IProductDB);
    expect(result).toEqual({
      id: "507f1f77bcf86cd799439011",
      name: "testProductName",
      price: 15,
    });
  });

  it("should return list of productDto", () => {
    const result = fromProductDbToProductDto(
      arrayOfTestProducts as IProductDB[]
    );
    expect(result).toEqual([
      {
        id: "407f1f27bcf66cd799439086",
        name: "testProductName",
        price: 15,
      },
      { id: "307f1f27bcf66cd794439081", name: "testProductName2", price: 85 },
    ]);
  });

  it("should return test product with updateDate", () => {
    const result = fromProductDbToProductDto(
      testProductAfterUpdate as IProductDB
    );
    expect(result).toEqual({
      id: "507f1f77bcf86cd799439019",
      name: "testProductWithUpdateDate",
      price: 77,
      updateDate: "2022-11-09T14:47:07.367Z",
    });
  });
});
