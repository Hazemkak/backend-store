import db from "../database";
import dotenv from "dotenv";
import { AuthHelper } from "../helpers/auth.helper";

dotenv.config();

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password?: string;
  username: string;
};

export type UserInput = {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export class UserModel {
  async create(user: UserInput): Promise<User> {
    const conn = await db.connect();
    user.password = await AuthHelper.hash(user.password);
    const sql = `INSERT INTO USERS (firstName,lastName,password,username) VALUES('${user.firstName}','${user.lastName}','${user.password}','${user.username}') RETURNING * ;`;
    const users = await conn.query(sql);
    conn.release();
    return {
      id: Number(users.rows[0].id),
      username: String(users.rows[0].username),
      firstName: String(users.rows[0].firstName),
      lastName: String(users.rows[0].lastName),
    };
  }

  async index(): Promise<User[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM USERS;";
    const users = await conn.query(sql);
    conn.release();
    return users.rows;
  }

  async show(id: number): Promise<User> {
    const conn = await db.connect();
    const sql = `SELECT * FROM USERS WHERE id=${id};`;
    const users = await conn.query(sql);
    conn.release();
    return {
      id: Number(users.rows[0].id),
      username: String(users.rows[0].username),
      firstName: String(users.rows[0].firstName),
      lastName: String(users.rows[0].lastName),
    };
  }

  async findByUsername(username: string): Promise<User> {
    const conn = await db.connect();
    const sql = `SELECT * FROM USERS WHERE username='${username}';`;
    const users = await conn.query(sql);
    conn.release();
    return users.rows[0];
  }
}
