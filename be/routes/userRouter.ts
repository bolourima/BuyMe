import Router from "express";
import { getUsers, refreshToken, signUp } from "../controllers/userController";

const userRouter = Router();
userRouter.get("/users", getUsers);
userRouter.get("/refreshToken", refreshToken);
export { userRouter };

// const authRouter = Router();
// authRouter.post("auth/signup", signUp);
// // authRouter.post("auth/signin", signIn);

// export { authRouter };
