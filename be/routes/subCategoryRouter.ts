import { Router } from "express";
import {
  createSubCategory,
  editSubCategories,
  getSubCategories,
} from "../controllers/subCategoryController";

export const subCategoryRouter = Router();
subCategoryRouter.route("/createSubCategory").post(createSubCategory);
subCategoryRouter.route("/getSubCategories").post(getSubCategories);
subCategoryRouter.route("/editSub").put(editSubCategories);
