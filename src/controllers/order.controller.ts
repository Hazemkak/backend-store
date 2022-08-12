import { Request, Response } from "express";
import { OrderModel } from "../models/orders.model";

const orderControllerCreate = async (req: Request, res: Response) => {
  try {
    const { user_id, status, products_id } = req.body;
    const orderModel = new OrderModel();
    await orderModel.createOrder({
      user_id,
      status,
      products_id,
    });
    res.status(200).json({ message: `order is created successfully` });
  } catch (error) {
    res.status(500).json(`error while getting orders ${error}`);
  }
};

const orderControllerActive = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const orderModel = new OrderModel();
    const orders = await orderModel.currentOrdersByUser(Number(user_id));
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(`error while getting orders ${error}`);
  }
};

const orderControllerComplete = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const orderModel = new OrderModel();
    const orders = await orderModel.completeOrdersByUser(Number(user_id));
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json(`error while getting orders ${error}`);
  }
};

export {
  orderControllerActive,
  orderControllerComplete,
  orderControllerCreate,
};
