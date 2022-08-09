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

export class OrderModel {
  async currentOrdersByUser(id: string): Promise<Orders[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM products WHERE USER_ID=${id} AND STATUS='${Status.ACTIVE}' ;`;
    const products = await conn.query(sql);
    conn.release();
    return products.rows;
  }
  async completeOrdersByUser(id: string): Promise<Orders[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM products WHERE USER_ID=${id} AND STATUS='${Status.COMPLETE}' ;`;
    const products = await conn.query(sql);
    conn.release();
    return products.rows;
  }
}
