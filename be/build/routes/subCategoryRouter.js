"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryRouter = void 0;
const express_1 = require("express");
const subCategoryController_1 = require("../controllers/subCategoryController");
exports.subCategoryRouter = (0, express_1.Router)();
exports.subCategoryRouter.route("/getSubCategories").post(subCategoryController_1.getSubCategories);
exports.subCategoryRouter.route("/getBrands");
