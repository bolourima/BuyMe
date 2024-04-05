"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRouter = void 0;
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const signUpRouter = (0, express_1.Router)();
exports.signUpRouter = signUpRouter;
signUpRouter.post("/signup", userController_1.signUp);
