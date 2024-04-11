import { Router } from "express";
import {
  adminSignin,
  adminSignup,
  filterByDate,
  getAllAdmins,
  getOrdersOfSelectedAdmin,
} from "../controllers/adminController";

export const adminRouter = Router();
adminRouter.route("/admin").post(adminSignup);
adminRouter.route("/signinAdmin").post(adminSignin);
adminRouter.route("/shopRelatedData/:id").get(getOrdersOfSelectedAdmin);
adminRouter.route("/filterByDate").post(filterByDate);
adminRouter.route("/getAllAdmins").post(getAllAdmins);
