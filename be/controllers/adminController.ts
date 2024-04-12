import { Request, Response } from "express";
import Admin from "../models/adminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Order from "../models/orderModel";
import { Types } from "mongoose";
const jwtPrivateKey = process.env.SECRET_KEY;
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find({ subAdmin: req.body.subAdmin });
    return res.status(200).send(admins);
  } catch (error) {
    console.error("error in get all admins", error);
    return res.status(400).json({ err: error });
  }
};
export const filterByDate = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      {
        $match: {
          "products.product.shopId": new Types.ObjectId(req.body.id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.product.shopId": new Types.ObjectId(req.body.id),
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
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const filteredOrder = result.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
    filteredOrder.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
    return res.status(200).json({ orderData: filteredOrder });
  } catch (error) {
    console.error("error in fiter by date", error);
    return res.status(400).json({ error: error });
  }
};
export const getOrdersOfSelectedAdmin = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      {
        $match: {
          "products.product.shopId": new Types.ObjectId(req.params.id),
        },
      },
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.product.shopId": new Types.ObjectId(req.params.id),
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
      return b.createdAt - a.createdAt;
    });
    return res.status(200).json({ orderData: result });
  } catch (error) {
    console.error("error in get order of selected admin", error);
    return res.status(400).json({ err: error });
  }
};
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const bankAccountCoincidence = await Admin.findOne({
      bankAccount: req.body.bankAccount,
    });
    if (bankAccountCoincidence) {
      return res.status(405).json({ msg: "bank coincidence" });
    }
    const nameCoincidence = await Admin.findOne({
      shopName: req.body.shopName,
    });
    if (nameCoincidence) {
      return res.status(405).json({ msg: "name coincidence" });
    }
    const emailCoincidence = await Admin.findOne({
      email: req.body.email,
    });
    if (emailCoincidence) {
      return res.status(405).json({ msg: "email coincidence" });
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.body.subAdmin === true) {
      const newAdmin = await Admin.create({
        shopName: req.body.shopName,
        email: req.body.email,
        password: encryptedPassword,
        subAdmin: true,
        categories: req.body.categories,
        bankAccount: req.body.bankAccount,
        description: req.body.description,
      });
    } else {
      const newAdmin = await Admin.create({
        shopName: req.body.shopName,
        password: encryptedPassword,
        subAdmin: false,
      });
    }
    return res.status(201).json({ msg: "admin signed up" });
  } catch (error) {
    console.error("error in adminSignup", error);
    return res.status(400).json({ msg: "Failed to admin signup" });
  }
};
export const adminSignin = async (req: Request, res: Response) => {
  try {
    const { shopName, password } = req.body;
    if (!shopName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const admin = await Admin.findOne({ shopName });
    if (!admin) {
      return res.status(400).json({ msg: "Shop not found" });
    }
    const adminPassword: string = admin.password || "";
    const result = await bcrypt.compare(password, adminPassword);
    if (!result) return res.status(400).json({ message: "Wrong Password" });
    const accessToken = jwt.sign(
      { id: admin._id, subAdmin: admin.subAdmin },
      jwtPrivateKey as string,
      {
        expiresIn: "10d",
      }
    );
    const refreshToken = jwt.sign({ id: admin._id }, jwtPrivateKey as string, {
      expiresIn: "10d",
    });
    return res
      .status(200)
      .cookie("refreshToken", refreshToken)
      .header({ Authorization: accessToken })
      .json({ user: admin, accessToken: accessToken });
  } catch (error) {
    console.error("Error in adminSignin", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const orderStatusChanging = async (req: Request, res: Response) => {
  try {
    if (!req.body.id || !req.body.Status) {
      return res.status(400).json({ msg: "ID and status are required" });
    }
    console.log(req.body.Status);
    const updatedOrder = await Order.findByIdAndUpdate(req.body.id, {
      deliveryStatus: req.body.Status,
    });

    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }

    console.log(updatedOrder);
    return res.status(200).json({ msg: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ msg: "Failed to update order status" });
  }
};
