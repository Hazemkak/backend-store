import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/users.model";

dotenv.config();

export class AuthHelper {
  static async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password + process.env.PEPPER,
      Number(process.env.SALT_ROUNDS)
    );
    return hashedPassword;
  }

  static async verifyPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    const userQuery = new UserModel();
    const user = await userQuery.findByUsername(username);
    if (!user || !user.password) return null;
    const isSame = await bcrypt.compare(
      password + process.env.PEPPER,
      user.password
    );
    if (!isSame) return null;
    return user;
  }

  static generateToken(id: number): string {
    const token: string = jwt.sign({ id }, String(process.env.USER_SECRET), {
      expiresIn: Number(process.env.JWT_EXPIRES),
    });
    return token;
  }

  static verifyToken(token: string): boolean {
    const payload = jwt.verify(token, String(process.env.USER_SECRET));
    if (!payload) return false;
    return true;
  }
}
