"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.route("/createCategory").post(categoryController_1.createCategory);
