import { Router } from "express";
import { adminSignin, adminSignup } from "../controllers/adminController";

export const adminRouter = Router();
adminRouter.route("/admin").post(adminSignup);
adminRouter.route("/signinAdmin").post(adminSignin);
