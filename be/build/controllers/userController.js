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
exports.createUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password } = req.body;
    console.log("user req.body", req.body);
    try {
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
    }
});
exports.createUser = createUser;
