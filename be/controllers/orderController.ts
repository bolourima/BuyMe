import { Response, Request, NextFunction } from "express";
import Order from "../models/orderModel";
interface AuthenticatedRequest extends Request {
  user?: any;
}
const orderNumberGenerator = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orderNumber = orderNumberGenerator();
    const order = await Order.create({
      products: req.body.products,
      orderNumber: orderNumber,
      user: req.user.id,
      total: req.body.total,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({ msg: "Order successfully created" });
  } catch (error) {
    console.error("error in creating order", error);
    return res.status(400).json({ msg: "Failed to create order" });
  }
};
