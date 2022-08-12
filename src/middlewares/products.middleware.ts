import { NextFunction, Request, Response } from "express";

export const productCheckEntries = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, category } = req.body;
  try {
    if (!name || !category) {
      return res.status(400).json({
        message: "name/category all are required",
      });
    }

    if (name.length > 50 || category.length > 50)
      return res.status(400).json({
        message: "name/category must not exceed 50 characters",
      });

    if (Number(price) < 0)
      return res.status(400).json({
        message: "price must be a positive number",
      });
    next();
  } catch (error) {
    return res.status(400).json({ message: `error in the inputs ${error}` });
  }
};
