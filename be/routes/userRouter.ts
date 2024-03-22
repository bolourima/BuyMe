import Router from "express";
import { getUsers, signUp } from "../controllers/userController";

const userRouter = Router();
userRouter.get("/users", getUsers);

export { userRouter };

// const authRouter = Router();
// authRouter.post("auth/signup", signUp);
// // authRouter.post("auth/signin", signIn);

// export { authRouter };
