import { Router } from "express";
import {
  createSubCategory,
  editSubCategories,
  getSubCategories,
  getSubCategory,
  postSubCategories,
} from "../controllers/subCategoryController";

export const subCategoryRouter = Router();
subCategoryRouter.route("/createSubCategory").post(createSubCategory);
subCategoryRouter.route("/getSubCategories").post(postSubCategories);
subCategoryRouter.route("/getSubCategorys/:category").get(getSubCategory)
subCategoryRouter.route("/getSubCategories").get(getSubCategories);
subCategoryRouter.route("/editSub").put(editSubCategories);
