import { Request, Response } from "express";
import Address from "../models/addressModel";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const newAddress = async (req: AuthenticatedRequest, res: Response) => {
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
    const newAddresId = address._id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      {
        $push: {
          addresses: newAddresId,
        },
      },
      {
        new: true,
      }
    );

    console.log({ updatedUser });

    return res.status(201).json({
      message: `New address created for ${user}, Address id:${newAddresId}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "User creation failed" });
  }
};
