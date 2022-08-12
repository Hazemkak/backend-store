import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.USER_SECRET as string);
    if (!decoded) throw new Error();
    next();
  } catch (error) {
    res.status(401).send("unauthorized");
  }
};
