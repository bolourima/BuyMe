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
exports.filterSubCategory = exports.searchProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchInput = req.body.input;
        const products = yield productModel_1.default.find({
            $or: [
                { name: { $regex: searchInput, $options: "i" } },
                { brandName: { $regex: searchInput, $options: "i" } },
                { subCategoryName: { $regex: searchInput, $options: "i" } },
            ],
        });
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("Error in searchProduct:", error);
        return res.status(400).send("Internal Server Error");
    }
});
exports.searchProduct = searchProduct;
const filterSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inputValue, inputBrandName } = req.body;
        const products = yield productModel_1.default.find({
            $or: [{ price: { $gte: inputValue[0], $lte: inputValue[1] } }],
        });
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("Error in filterSubCategory:", error);
        return res.status(400).send("Internal Server Error");
    }
});
exports.filterSubCategory = filterSubCategory;
