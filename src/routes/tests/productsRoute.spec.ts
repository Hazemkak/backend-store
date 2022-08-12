import supertest from "supertest";
import app from "../../server";
const request = supertest(app);

let token = "";
describe("Products Routes", () => {
  describe("Create", () => {
    it("should return created product", async () => {
      //login first
      const res0 = await request
        .post("/users/login")
        .send({ username: "user1", password: "password0" });

      const resBody0 = JSON.parse(res0.text);

      token = resBody0.token;
      const res = await request
        .post("/products/create")
        .send({
          name: "prod5",
          category: "cat1",
          price: 10,
        })
        .set("Authorization", `Bearer ${token}`);
      const resBody = JSON.parse(res.text);
      expect(resBody.message).toEqual("Product is created successfully");
      expect(resBody.product).toEqual({
        id: 3,
        price: 10,
        name: "prod5",
        category: "cat1",
      });
    });
    it("should return unauthorized error", async () => {
      try {
        await request.post("/products/create").send({
          name: "prod5",
          category: "cat1",
          price: 10,
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
  describe("Show", () => {
    it("should return the product ", async () => {
      const res = await request.get("/products/3");
      const resBody = JSON.parse(res.text);

      expect(resBody).toEqual({
        id: 3,
        price: 10,
        name: "prod5",
        category: "cat1",
      });
    });
  });

  describe("Index", () => {
    it("should return array of products ", async () => {
      const res = await request.get("/products");
      const resBody = JSON.parse(res.text);

      expect(resBody).toEqual([
        { id: 1, name: "prod0", price: "10", category: "cat0" },
        { id: 2, name: "prod1", price: "10", category: "cat1" },
        { id: 3, name: "prod5", price: "10", category: "cat1" },
      ]);
    });
  });

  describe("GetByCategory", () => {
    it("should return empty array", async () => {
      const res = await request.get("/products/category/catFake");
      const resBody = JSON.parse(res.text);

      expect(resBody.products).toEqual([]);
    });
    it("should return array of cat1", async () => {
      const res = await request.get("/products/category/cat1");
      const resBody = JSON.parse(res.text);

      expect(resBody.products).toEqual([
        { id: 2, name: "prod1", price: "10", category: "cat1" },
        { id: 3, name: "prod5", price: "10", category: "cat1" },
      ]);
    });
  });
});
