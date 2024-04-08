import { Request, Response } from "express";
import Address from "../models/addressModel";

export const newAddress = async (req: Request, res: Response) => {
  const { user, addressName, city, district, khoroo, building, deliveryNote } =
    req.body;
  try {
    const address = await Address.create({
      user,
      addressName,
      city,
      district,
      khoroo,
      building,
      deliveryNote,
    });
    return res
      .status(201)
      .json({ message: `${user} new address created successfully` });
  } catch (error) {
    return res.status(400).json({ message: "User creation failed" });
  }
};
