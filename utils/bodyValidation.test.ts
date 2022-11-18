import { bodyValidation } from "./bodyValidation";
import { IProduct } from "../interfaces/interfaces";

const wrongTestData: Partial<IProduct> = {
  price: 55,
};

const correctTestData: Partial<IProduct> = {
  price: 60,
  name: "testname",
};

describe("tests bodyValidation function", () => {
  it("should return false", async () => {
    const result = await bodyValidation(wrongTestData as IProduct);

    expect(result).toEqual(false);
  });

  it("should return true", async () => {
    const result = await bodyValidation(correctTestData as IProduct);

    expect(result).toEqual(true);
  });
});
