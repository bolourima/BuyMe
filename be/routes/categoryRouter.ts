import { Router } from "express";
import { getCategories } from "../controllers/categoryController";

export const categoryRouter = Router();
categoryRouter.route("/getCategories").get(getCategories);
