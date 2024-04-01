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
exports.signIn = exports.signUp = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtPrivateKey = process.env.SECRET_KEY;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        return res.status(200).send(users);
    }
    catch (error) {
        console.error("error in getUsers", error);
        return res.status(400).send("Failed to getUser");
    }
});
exports.getUsers = getUsers;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password } = req.body;
    console.log("user req.body", req.body);
    try {
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const hashedPassport = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({
            name,
            email,
            phoneNumber,
            password: hashedPassport,
        });
        console.log("created new user", newUser);
        return res
            .status(201)
            .json({ message: `${newUser.email} user created successfully` });
    }
    catch (error) {
        console.error("error in createUser", error);
        return res.status(400).json({ message: "User creation failed" });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const foundUser = yield userModel_1.default.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: "Email not found" });
        }
        const checkPassport = yield bcrypt_1.default.compare(password, foundUser.password);
        if (!checkPassport) {
            return res.status(400).json({ message: "Passport not match" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: foundUser._id }, jwtPrivateKey, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: foundUser._id }, jwtPrivateKey, {
            expiresIn: "1d",
        });
        res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .header({ Authorization: accessToken })
            .json({ user: foundUser, accessToken: accessToken });
    }
    catch (error) {
        console.error("Error during signin user. Message is:", error);
        res.status(400).json({ message: "User signin failed" });
    }
});
exports.signIn = signIn;
