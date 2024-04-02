import { Request, Response } from "express";
import Address from "../models/addressModel";

export const newAddress = async (req: Request, res: Response) => {
  const { user, city, district, khoroo, building } = req.body;
  console.log("reqbody", req.body);
  try {
    if (!user || !city || !district || !khoroo || !building) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const address = await Address.create({
      user,
      city,
      district,
      khoroo,
      building,
    });
    console.log("address", address);
    return res
      .status(201)
      .json({ message: `${user} new address created successfully` });
  } catch (error) {
    console.error("error in new address", error);
    return res.status(400).json({ message: "User creation failed" });
  }
};
