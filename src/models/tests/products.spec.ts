import { ProductModel } from "../products.model";

const productModel = new ProductModel();

describe("Product Model", () => {
  it("should create the product successfully", async () => {
    const prod = await productModel.create({
      name: "prod0",
      price: 10,
      category: "cat0",
    });
    expect(prod).toBeTruthy();
  });

  it("should return the product on create", async () => {
    const prod = await productModel.create({
      name: "prod1",
      price: 10,
      category: "cat1",
    });
    expect(prod).toEqual({
      id: 2,
      name: "prod1",
      price: 10,
      category: "cat1",
    });
  });

  it("should return the product with given id on show", async () => {
    const prod = await productModel.show(1);
    expect(prod).toEqual({
      id: 1,
      name: "prod0",
      price: 10,
      category: "cat0",
    });
  });

  it("should return the product with given category", async () => {
    const prods = await productModel.findByCategory("cat0");
    expect(prods.length).toEqual(1);
  });

  it("should return all products", async () => {
    const prods = await productModel.index();
    expect(prods.length).toEqual(2);
  });
});
