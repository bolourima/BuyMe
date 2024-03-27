import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController";

export const categoryRouter = Router();
categoryRouter.route("/getCategories").get(getCategories);
categoryRouter.route("/createCategory").post(createCategory);
