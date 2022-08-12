import db from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  category?: string;
};

export interface ProductInput {
  name: string;
  price: number;
  category: string;
}

export class ProductModel {
  async create(product: ProductInput): Promise<Product> {
    const conn = await db.connect();
    const sql = `INSERT INTO product (name,price,category) VALUES('${product.name}',${product.price},'${product.category}') RETURNING *;`;
    const products = await conn.query(sql);
    conn.release();
    return products.rows[0];
  }
  async index(): Promise<Product[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM product;`;
    const products = await conn.query(sql);
    conn.release();
    return products.rows;
  }

  async show(id: string): Promise<Product> {
    const conn = await db.connect();
    const sql = `SELECT * FROM product WHERE id=${id};`;
    const products = await conn.query(sql);
    conn.release();
    return products.rows[0];
  }

  async findByCategory(category: string): Promise<Product[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM product WHERE category='${category}';`;
    const products = await conn.query(sql);
    conn.release();
    return products.rows;
  }
}
