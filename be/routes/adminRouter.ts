import { Router } from "express";
import { adminSignin, adminSignup } from "../controllers/adminController";

export const adminRouter = Router();
adminRouter.route("/admin").get(adminSignin).post(adminSignup);
