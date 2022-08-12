import { OrderModel, Status } from "../orders.model";

const order = new OrderModel();

// user_id: number;
//   status: Status;
//   products_id: { product_id: number; quantity: number }[];

describe("Order Model", async () => {
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
    expect(arr.length).toEqual(2);
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
