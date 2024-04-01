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
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getProducts = void 0;
const Cloudinary_1 = __importDefault(require("../utilities/Cloudinary"));
const productModel_1 = __importDefault(require("../models/productModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find().populate("categoryId");
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("error in getProducts", "PRODUCT ERRER", error);
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
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const date = `${new Date().getFullYear()}` +
            "/" +
            `${new Date().getMonth() + 1}` +
            "/" +
            `${new Date().getDate()}`;
        if (((_a = req.body.product.images) === null || _a === void 0 ? void 0 : _a.length) && ((_b = req.files) === null || _b === void 0 ? void 0 : _b.length)) {
            const productWithNewImages = JSON.parse(req.body.product);
            const { name, description, price, productCode, quantity, tag, disCount, categoryName, subCategoryName, brandName, _id, images, } = productWithNewImages;
            const newImages = req.files;
            let urlContainer = [];
            for (let i = 0; i < (newImages === null || newImages === void 0 ? void 0 : newImages.length); i++) {
                const url = yield uploadImg(newImages[i]);
                urlContainer.push(url);
            }
            urlContainer = [...urlContainer, ...images];
            const selectedCategory = yield categoryModel_1.default.findOne({ name: categoryName });
            const product = yield productModel_1.default.findOneAndUpdate({ _id: _id }, {
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
                _id,
                updatedAt: date,
            });
            return res.status(200).json({ msg: "Updated" });
        }
        if (req.body.product) {
            const productWithNewImages = JSON.parse(req.body.product);
            const { name, description, price, productCode, quantity, tag, disCount, categoryName, subCategoryName, brandName, _id, } = productWithNewImages;
            const images = req.files;
            const urlContainer = [];
            for (let i = 0; i < (images === null || images === void 0 ? void 0 : images.length); i++) {
                const url = yield uploadImg(images[i]);
                urlContainer.push(url);
            }
            const selectedCategory = yield categoryModel_1.default.findOne({ name: categoryName });
            const product = yield productModel_1.default.findOneAndUpdate({ _id: _id }, {
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
                _id,
                updatedAt: date,
            });
            return res.status(200).json({ msg: "Updated" });
        }
        else {
            const { name, description, price, productCode, quantity, tag, disCount, categoryName, subCategoryName, brandName, images, _id, } = req.body;
            const selectedCategory = yield categoryModel_1.default.findOne({ name: categoryName });
            const product = yield productModel_1.default.findByIdAndUpdate({ _id: _id }, {
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
                images,
                updatedAt: date,
            });
        }
        return res.status(200).json({ msg: "Updated" });
    }
    catch (error) {
        console.error("error in edit product", error);
        return res.status(400).json({ msg: "Failed to update" });
    }
});
exports.editProduct = editProduct;
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletableId = req.params.id;
        const deleting = yield productModel_1.default.findByIdAndDelete(deletableId);
        return res.status(200).json({ msg: "Successfully deleted" });
    }
    catch (error) {
        console.error("error in deleteProduct", error);
        return res.status(400).json({ msg: "Failed to delete" });
    }
});
exports.deleteProduct = deleteProduct;
