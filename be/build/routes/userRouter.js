"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const accessTokenAuth_1 = require("../middlewares/accessTokenAuth");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/users", userController_1.getUsers);
userRouter.get("/refreshToken", userController_1.refreshToken);
userRouter.get("/getUserInfo", accessTokenAuth_1.accessTokenAuth, userController_1.getUserInfo);
userRouter.put("/editUser", accessTokenAuth_1.accessTokenAuth, userController_1.editUser);
// const authRouter = Router();
// authRouter.post("auth/signup", signUp);
// // authRouter.post("auth/signin", signIn);
// export { authRouter };
