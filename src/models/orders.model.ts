import db from "../database";

enum Status {
  "ACTIVE" = "active",
  "COMPLETE" = "complete",
}
export type Orders = {
  id: number;
  userId: number;
  status: Status;
};

export interface InputOrder {
  user_id: number;
  status: Status;
  products_id: { product_id: number; quantity: number }[];
}

export class OrderModel {
  async currentOrdersByUser(id: string): Promise<Orders[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM orders WHERE USER_ID=${id} AND STATUS='${Status.ACTIVE}' ;`;
    const orders = await conn.query(sql);
    conn.release();
    return orders.rows;
  }
  async completeOrdersByUser(id: string): Promise<Orders[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM orders WHERE USER_ID=${id} AND STATUS='${Status.COMPLETE}' ;`;
    const orders = await conn.query(sql);
    conn.release();
    return orders.rows;
  }
  async createOrder(order: InputOrder): Promise<void> {
    const conn = await db.connect();
    const sql = `INSERT INTO orders (user_id,status) VALUES(${order.user_id},'${order.status}') RETURNING * ;`;
    const createdOrder = await conn.query(sql);
    const newOrder = createdOrder.rows[0];

    for (let i = 0; i < order.products_id.length; i++) {
      const entry = order.products_id[i];
      const sql =
        `INSERT INTO orders_products (order_id,product_id,quantity)` +
        ` VALUES(${newOrder.id},${entry.product_id},${entry.quantity}) ; `;

      await conn.query(sql);
    }

    conn.release();
  }
}
