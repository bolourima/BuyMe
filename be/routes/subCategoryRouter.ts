import { Router } from "express";
import { getSubCategories } from "../controllers/subCategoryController";

export const subCategoryRouter = Router();
subCategoryRouter.route("/getSubCategories").post(getSubCategories);
subCategoryRouter.route("/getBrands");
