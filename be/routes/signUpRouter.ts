import { signIn, signUp } from "../controllers/userController";
import { Router } from "express";

const signUpRouter = Router();

signUpRouter.post("/signup", signUp);

export { signUpRouter };
