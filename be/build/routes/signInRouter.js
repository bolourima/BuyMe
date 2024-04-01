"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInRouter = void 0;
const userController_1 = require("../controllers/userController");
const express_1 = __importDefault(require("express"));
const signInRouter = (0, express_1.default)();
exports.signInRouter = signInRouter;
signInRouter.post("/signin", userController_1.signIn);
