import { Router } from "express";
import { createCategory } from "../controllers/categoryController";

export const categoryRouter = Router();
categoryRouter.route("/createCategory").post(createCategory);
