"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
const accessTokenAuth = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "unauthorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("error in auth", error);
        return res.status(403).json({ message: "invalid" });
    }
};
exports.accessTokenAuth = accessTokenAuth;
