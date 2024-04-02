import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import Basket from "../models/basketModel";

const jwtPrivateKey = process.env.SECRET_KEY;
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.error("error in getUsers", error);
    return res.status(400).send("Failed to getUser");
  }
};
export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error("error in getUserInfo", error);
    return res.status(400).json({ msg: "Failed to getUserInfo" });
  }
};
export const refreshToken = async (req: Request, res: Response) => {
  // console.log(req.cookies, "cookies");
  // console.log(req.cookies, "cookies");
  // return res.status(200).send("send");
  // const refreshToken = await req.cookies["refreshToken"];
  // if (!refreshToken) {
  //   return res.status(400).json({ msg: "Access denied" });
  // }
  // if (typeof jwtPrivateKey !== "string") {
  //   throw new Error("jwtPrivateKey is not defined");
  // }
  // return res.status(200).send("");
  // try {
  //   const decoded = jwt.verify(refreshToken, jwtPrivateKey) as JwtPayload;
  //   const accessToken = jwt.sign({ id: decoded.id }, jwtPrivateKey as string, {
  //     expiresIn: "1h",
  //   });
  //   return res
  //     .status(200)
  //     .header("Authorization", accessToken)
  //     .json({ id: `${decoded.id}`, accessToken: `${accessToken}` });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(400).json({ msg: "Someting wrong in refreshToken" });
  // }
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
        expiresIn: "10d",
      }
    );

    const refreshToken = jwt.sign(
      { id: foundUser._id },
      jwtPrivateKey as string,
      {
        expiresIn: "10d",
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
