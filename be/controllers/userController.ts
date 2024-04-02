import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Basket from "../models/basketModel";

const jwtPrivateKey = process.env.SECRET_KEY;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error in getUsers", error);
    return res.status(400).send("Failed to getUser");
  }
};
export const signUp = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;
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
    const newBasket = await Basket.create({
      user: newUser._id,
      products: [],
    });
    return res
      .status(201)
      .json({ message: `${newUser.email} user created successfully` });
  } catch (error) {
    console.error("error in createUser", error);
    return res.status(400).json({ message: "User creation failed" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "Email not found" });
    }
    const checkPassport = await bcrypt.compare(password, foundUser.password);
    if (!checkPassport) {
      return res.status(400).json({ message: "Passport not match" });
    }

    const accessToken = jwt.sign(
      { id: foundUser._id },
      jwtPrivateKey as string,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { id: foundUser._id },
      jwtPrivateKey as string,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .cookie("refreshToken", refreshToken)
      .header({ Authorization: accessToken })
      .json({ user: foundUser, accessToken: accessToken });
  } catch (error) {
    console.error("Error during signin user. Message is:", error);
    res.status(400).json({ message: "User signin failed" });
  }
};
