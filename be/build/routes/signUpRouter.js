"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRouter = void 0;
const userController_1 = require("../controllers/userController");
const express_1 = __importDefault(require("express"));
const signUpRouter = (0, express_1.default)();
exports.signUpRouter = signUpRouter;
signUpRouter.post("/signup", userController_1.signUp);
