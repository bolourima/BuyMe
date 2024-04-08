"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSignin = exports.adminSignup = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtPrivateKey = process.env.SECRET_KEY;
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankAccountCoincidence = yield adminModel_1.default.findOne({
            bankAccount: req.body.bankAccount,
        });
        if (bankAccountCoincidence) {
            return res.status(405).json({ msg: "bank coincidence" });
        }
        const nameCoincidence = yield adminModel_1.default.findOne({
            shopName: req.body.shopName,
        });
        if (nameCoincidence) {
            return res.status(405).json({ msg: "name coincidence" });
        }
        const emailCoincidence = yield adminModel_1.default.findOne({
            email: req.body.email,
        });
        if (emailCoincidence) {
            return res.status(405).json({ msg: "email coincidence" });
        }
        const encryptedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        if (req.body.subAdmin === true) {
            const newAdmin = yield adminModel_1.default.create({
                shopName: req.body.shopName,
                email: req.body.email,
                password: encryptedPassword,
                subAdmin: true,
                categories: req.body.categories,
                bankAccount: req.body.bankAccount,
            });
        }
        else {
            const newAdmin = yield adminModel_1.default.create({
                shopName: req.body.shopName,
                password: encryptedPassword,
                subAdmin: false,
            });
        }
        return res.status(201).json({ msg: "admin signed up" });
    }
    catch (error) {
        console.error("error in adminSignup", error);
        return res.status(400).json({ msg: "Failed to admin signup" });
    }
});
exports.adminSignup = adminSignup;
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shopName, password } = req.body;
        if (!shopName || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const admin = yield adminModel_1.default.findOne({ shopName });
        if (!admin) {
            return res.status(400).json({ msg: "Shop not found" });
        }
        const adminPassword = admin.password || "";
        const result = yield bcrypt_1.default.compare(password, adminPassword);
        if (!result)
            return res.status(400).json({ message: "Wrong Password" });
        const accessToken = jsonwebtoken_1.default.sign({ id: admin._id }, jwtPrivateKey, {
            expiresIn: "10d",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: admin._id }, jwtPrivateKey, {
            expiresIn: "10d",
        });
        return res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .header({ Authorization: accessToken })
            .json({ user: admin, accessToken: accessToken });
    }
    catch (error) {
        console.error("Error in adminSignin", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.adminSignin = adminSignin;
