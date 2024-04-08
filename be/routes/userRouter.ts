import { Router } from "express";
import {
  editUser,
  getUserInfo,
  getUsers,
  refreshToken,
  signUp,
} from "../controllers/userController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

const userRouter = Router();
userRouter.get("/users", getUsers);
userRouter.get("/refreshToken", refreshToken);
userRouter.get("/getUserInfo", accessTokenAuth, getUserInfo);
userRouter.put("/editUser", accessTokenAuth, editUser);
export { userRouter };

// const authRouter = Router();
// authRouter.post("auth/signup", signUp);
// // authRouter.post("auth/signin", signIn);

// export { authRouter };
