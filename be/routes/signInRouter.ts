import { signIn } from "../controllers/userController";
import Router from "express";

const signInRouter = Router();

signInRouter.post("/signin", signIn);

export { signInRouter };
