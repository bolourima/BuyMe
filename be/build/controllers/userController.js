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
exports.editUser = exports.signIn = exports.signUp = exports.refreshToken = exports.getUserInfo = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const basketModel_1 = __importDefault(require("../models/basketModel"));
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
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.user.id);
        return res.status(200).json({ user: user });
    }
    catch (error) {
        console.error("error in getUserInfo", error);
        return res.status(400).json({ msg: "Failed to getUserInfo" });
    }
});
exports.getUserInfo = getUserInfo;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.cookies, "cookies");
    // console.log(req.cookies, "cookies");
    // return res.status(200).send("send");
    // const refreshToken = await req.cookies["refreshToken"];
    // if (!refreshToken) {
    //   return res.status(400).json({ msg: "Access denied" });
    // }
    // if (typeof jwtPrivateKey !== "string") {
    //   throw new Error("jwtPrivateKey is not defined");
    // }
    // return res.status(200).send("");
    // try {
    //   const decoded = jwt.verify(refreshToken, jwtPrivateKey) as JwtPayload;
    //   const accessToken = jwt.sign({ id: decoded.id }, jwtPrivateKey as string, {
    //     expiresIn: "1h",
    //   });
    //   return res
    //     .status(200)
    //     .header("Authorization", accessToken)
    //     .json({ id: `${decoded.id}`, accessToken: `${accessToken}` });
    // } catch (error) {
    //   console.error(error);
    //   return res.status(400).json({ msg: "Someting wrong in refreshToken" });
    // }
});
exports.refreshToken = refreshToken;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password } = req.body;
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
            avatarImg: "https://res.cloudinary.com/dl93ggn7x/image/upload/v1710491194/bvkfvotkzfe0ikwznfaa.jpg",
        });
        const newBasket = yield basketModel_1.default.create({
            user: newUser._id,
            products: [],
        });
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
        const accessToken = jsonwebtoken_1.default.sign({ id: foundUser._id, username: foundUser.shopName }, jwtPrivateKey, {
            expiresIn: "10d",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: foundUser._id }, jwtPrivateKey, {
            expiresIn: "10d",
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
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.user.id);
        yield userModel_1.default.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            avatarImg: req.body.avatarImg,
        });
        return res.status(200).json({ msg: "Successfully edited" });
    }
    catch (error) {
        console.error("error in edituser", error);
        return res.status(400).json({ msg: error });
    }
});
exports.editUser = editUser;
