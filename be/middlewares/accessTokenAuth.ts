import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY as string;
import { Response, Request, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const accessTokenAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken: any =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("error in auth", error);
    return res.status(403).json({ message: "invalid" });
  }
};
