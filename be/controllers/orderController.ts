import { Response, Request, NextFunction } from "express";
import Order from "../models/orderModel";
import Basket from "../models/basketModel";
import { Types } from "mongoose";
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await Order.create({
      products: req.body.products,
      orderNumber: req.body.orderNumber,
      user: req.user.id,
      total: req.body.total,
      createdAt: new Date(),
      updatedAt: new Date(),
      invoiceId: req.body.invoiceId,
      paymentStatus: "UNPAID",
      deliveryStatus: "PENDING",
    });
    await Basket.findOneAndUpdate(
      { user: req.user.id },
      { $set: { products: [] } }
    );
    return res
      .status(201)
      .json({ msg: "Order successfully created", invoiceId: order.invoiceId });
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
    const pipeline = [
      {
        $match: {
          "products.product.shopId": new Types.ObjectId(req.user.id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.product.shopId": new Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$_id",
          products: { $push: "$products" },
          orderNumber: { $first: "$orderNumber" },
          user: { $first: "$user" },
          total: { $first: "$total" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          invoiceId: { $first: "$invoiceId" },
          paymentStatus: { $first: "$paymentStatus" },
          deliveryStatus: { $first: "$deliveryStatus" },
        },
      },
    ];

    const result = await Order.aggregate(pipeline);
    result.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });
    const shopIdMatchedProductsOfOrder: any = [];
    result.map((el) => {
      return shopIdMatchedProductsOfOrder.push(
        el.products.map((ele: any) => {
          return {
            orderNumber: el.orderNumber,
            user: el.user,
            createdAt: el.createdAt,
            product: ele.product,
            selectedProductQuantity: ele.selectedProductQuantity,
          };
        })
      );
    });
    return res.status(200).json({ order: shopIdMatchedProductsOfOrder });
  } catch (error) {
    console.error("error in getOrdersInAdmin", error);
    return res.status(400).send("Failed to get orders");
  }
};
export const getOrdersOfUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("user");
    return res.status(200).send(orders);
  } catch (error) {
    console.error("error in getordersofuser", error);
    return res.status(400).json({ error: error });
  }
};
export const changeOrderInvoice = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    await Order.findOneAndUpdate(
      { _id: req.params.id },
      { invoiceId: req.body.invoiceId }
    );
    return res.status(200).json({ msg: "Invoice id updated" });
  } catch (error) {
    console.error("error in change order invoice", error);
    return res.status(400).json({ error: error });
  }
};
export const changeDeliveryStatusOfStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
  } catch (error) {
    console.error("error in change delivery status of order", error);
  }
};
