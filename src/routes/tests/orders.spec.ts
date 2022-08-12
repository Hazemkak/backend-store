import supertest from "supertest";
import app from "../../server";
import * as controller from "../../controllers/order.controller";

describe("Orders Route", (): void => {
  const request = supertest(app);

  it("should call the corresponding controller method for the route", async () => {
    const data = await request.get("/orders/complete/1");
    expect(controller.orderControllerComplete).toHaveBeenCalled();
  });
});
