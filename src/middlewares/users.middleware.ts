import { NextFunction, Request, Response } from "express";

export const userCheckEntries = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, firstName, lastName, username } = req.body;
  if (!password || !firstName || !lastName || !username) {
    return res.status(400).json({
      message: "firstName/lastName/password/username all are required",
    });
  }

  if (firstName.length > 50 || lastName.length > 50 || username.length > 50)
    return res
      .status(400)
      .json({
        message: "firstName/lastName/username must not exceed 50 characters",
      });

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password should be at least 8 characters" });
  }
  next();
};
