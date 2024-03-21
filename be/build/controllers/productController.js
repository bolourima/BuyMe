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
exports.createProduct = exports.getProducts = void 0;
const Cloudinary_1 = __importDefault(require("../utilities/Cloudinary"));
const productModel_1 = __importDefault(require("../models/productModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("error in getProducts", error);
        return res.status(400).send("Failed to getProducts");
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, productCode, quantity, tag, disCount, categoryName, subCategoryName, brandName, } = JSON.parse(req.body.product);
        const images = req.files;
        const urlContainer = [];
        for (let i = 0; i < (images === null || images === void 0 ? void 0 : images.length); i++) {
            const url = yield uploadImg(images[i]);
            urlContainer.push(url);
        }
        const selectedCategory = yield categoryModel_1.default.findOne({
            name: categoryName,
        });
        const date = `${new Date().getFullYear()}` +
            "/" +
            `${new Date().getMonth() + 1}` +
            "/" +
            `${new Date().getDate()}`;
        const newProduct = yield productModel_1.default.create({
            name,
            description,
            price,
            productCode,
            quantity,
            tag,
            disCount,
            categoryId: selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory._id,
            subCategoryName,
            brandName,
            images: urlContainer,
            createdAt: date,
            updatedAt: date,
        });
        console.log(newProduct);
        return res.status(201).json({ msg: "product created" });
    }
    catch (error) {
        console.error("error in createProduct", error);
    }
});
exports.createProduct = createProduct;
const uploadImg = (img) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadedFile = img;
        if (!uploadedFile) {
            return false;
        }
        try {
            const newImage = yield Cloudinary_1.default.uploader.upload(uploadedFile.path);
            const image = new productModel_1.default({ img: newImage.secure_url });
            return newImage.secure_url;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    catch (error) {
        console.error("error in uploadImg", error);
    }
});
