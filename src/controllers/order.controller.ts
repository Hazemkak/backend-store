import { Request, Response } from "express";
import { OrderModel } from "../models/orders.model";

const orderControllerActive = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const orderModel = new OrderModel();
    const orders = await orderModel.currentOrdersByUser(user_id);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(`error while getting orders ${error}`);
  }
};

const orderControllerComplete = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const orderModel = new OrderModel();
    const orders = await orderModel.completeOrdersByUser(user_id);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(`error while getting orders ${error}`);
  }
};

export { orderControllerActive, orderControllerComplete };
