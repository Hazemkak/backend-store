import { Request, Response } from "express";
import { AuthHelper } from "../helpers/auth.helper";
import { UserModel } from "../models/users.model";

const userControllerIndex = async (_req: Request, res: Response) => {
  try {
    const userModel = new UserModel();
    const users = await userModel.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(`error while getting users ${error}`);
  }
};

const userControllerShow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userModel = new UserModel();
    const user = await userModel.show(id);
    if (!user) res.status(400).json({ message: `user ${id} isn't found` });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`error while getting user ${error}`);
  }
};

const userControllerCreate = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, username } = req.body;
    const userModel = new UserModel();
    const user = await userModel.create({
      firstName,
      lastName,
      password,
      username,
    });
    const token = AuthHelper.generateToken(user.id);
    res.status(200).json({ message: `User is created successfully`, token });
  } catch (error) {
    res.status(500).json(`error while creating user ${error}`);
  }
};

const userControllerLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await AuthHelper.verifyPassword(username, password);
    if (user == null)
      return res.status(401).json({ message: "wrong password or username" });
    const token = AuthHelper.generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(`error while login ${error}`);
  }
};

export {
  userControllerIndex,
  userControllerShow,
  userControllerCreate,
  userControllerLogin,
};
