import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error in getUsers", error);
    return res.status(400).send("Failed to getUser");
  }
};
export const createUser = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;
  console.log("user req.body", req.body);
  try {
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const hashedPassport = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassport,
    });
    console.log("created new user", newUser);
    return res
      .status(201)
      .json({ message: `${newUser.email} user created successfully` });
  } catch (error) {
    console.error("error in createUser", error);
    return res.status(400).json({ message: "User creation failed" });
  }
};
