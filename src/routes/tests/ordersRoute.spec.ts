import supertest from "supertest";
import app from "../../server";
const request = supertest(app);

let token = "";
describe("Orders Routes", () => {
  it("should return active orders ", async () => {
    //login first
    const res0 = await request
      .post("/users/login")
      .send({ username: "user1", password: "password0" });

    const resBody0 = JSON.parse(res0.text);

    token = resBody0.token;
    const res = await request
      .get("/orders/active/1")
      .set("Authorization", `Bearer ${token}`);
    const resBody = JSON.parse(res.text);
    expect(resBody.orders).toEqual([{ id: 1, user_id: 1, status: "active" }]);
  });

  it("should return complete orders ", async () => {
    const res = await request
      .get("/orders/complete/1")
      .set("Authorization", `Bearer ${token}`);
    const resBody = JSON.parse(res.text);
    expect(resBody.orders).toEqual([{ id: 2, user_id: 1, status: "complete" }]);
  });

  it("should create the order to the given user", async () => {
    const res = await request
      .post("/orders/create")
      .send({
        user_id: 1,
        status: "active",
        products_id: [{ product_id: 1, quantity: 20 }],
      })
      .set("Authorization", `Bearer ${token}`);
    const resBody = JSON.parse(res.text);
    expect(resBody.message).toEqual("order is created successfully");
  });
});
