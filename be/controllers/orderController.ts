import { Response, Request, NextFunction } from "express";
import Order from "../models/orderModel";
import Basket from "../models/basketModel";
interface AuthenticatedRequest extends Request {
  user?: any;
}
const orderNumberGenerator = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await Basket.findOneAndUpdate(
      { user: req.user.id },
      { $set: { products: [] } }
    );
    const orderNumber = orderNumberGenerator();
    const order = await Order.create({
      products: req.body.products,
      orderNumber: orderNumber,
      user: req.user.id,
      total: req.body.total,
      createdAt: new Date(),
      updatedAt: new Date(),
      invoiceId: req.body.invoiceId,
    });
    return res.status(201).json({ msg: "Order successfully created" });
  } catch (error) {
    console.error("error in creating order", error);
    return res.status(400).json({ msg: "Failed to create order" });
  }
};
export const getOrdersInAdmin = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ shopId: req.user.id })
      .populate("user")
      .populate("products.product");
    return res.status(200).send(orders);
  } catch (error) {
    console.error("error in getOrdersInAdmin", error);
    return res.status(400).send("Failed to get orders");
  }
};
export const getSelectedOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ shopId: req.user.id })
      .populate("user")
      .populate("products.product");
  } catch (error) {
    console.error("error in getSelectedOrder", error);
  }
};
