import { Request, Response } from "express";
import Admin from "../models/adminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtPrivateKey = process.env.SECRET_KEY;
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
