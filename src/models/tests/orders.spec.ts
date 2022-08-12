import { OrderModel, Status } from "../orders.model";

const order = new OrderModel();

describe("Order Model", () => {
  it("should return array of len 2 active orders", async () => {
    await order.createOrder({
      user_id: 1,
      status: Status.ACTIVE,
      products_id: [
        { product_id: 1, quantity: 10 },
        { product_id: 2, quantity: 10 },
      ],
    });
    const arr = await order.currentOrdersByUser(1);
    expect(arr.length).toEqual(1);
  });
  it("should return array of len 2 active orders", async () => {
    await order.createOrder({
      user_id: 1,
      status: Status.COMPLETE,
      products_id: [{ product_id: 1, quantity: 10 }],
    });
    const arr = await order.completeOrdersByUser(1);
    expect(arr.length).toEqual(1);
  });
});
