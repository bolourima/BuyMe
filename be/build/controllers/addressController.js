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
exports.newAddress = void 0;
const addressModel_1 = __importDefault(require("../models/addressModel"));
const newAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, addressName, city, district, khoroo, building, deliveryNote } = req.body;
    try {
        const address = yield addressModel_1.default.create({
            user,
            addressName,
            city,
            district,
            khoroo,
            building,
            deliveryNote,
        });
        return res
            .status(201)
            .json({ message: `${user} new address created successfully` });
    }
    catch (error) {
        return res.status(400).json({ message: "User creation failed" });
    }
});
exports.newAddress = newAddress;
