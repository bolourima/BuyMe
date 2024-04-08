"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInRouter = void 0;
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const signInRouter = (0, express_1.Router)();
exports.signInRouter = signInRouter;
signInRouter.post("/signin", userController_1.signIn);
