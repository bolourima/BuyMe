"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.route("/admin").post(adminController_1.adminSignup);
exports.adminRouter.route("/signinAdmin").post(adminController_1.adminSignin);
