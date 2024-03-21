"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.default)();
exports.userRouter = userRouter;
userRouter.get("/users", userController_1.getUsers).post("/users", userController_1.createUser);
