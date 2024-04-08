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
exports.getSelectedProductsInAdmin = exports.getProductDetail = exports.deleteProduct = exports.editProduct = exports.createProduct = exports.uploadSingleImage = exports.getProducts = exports.getFilteredProducts = void 0;
const Cloudinary_1 = __importDefault(require("../utilities/Cloudinary"));
const productModel_1 = __importDefault(require("../models/productModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const getFilteredProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.category;
        const filteredCategory = yield categoryModel_1.default.find({ name });
        const categoryId = filteredCategory[0]._id;
        const products = yield productModel_1.default.find({ categoryId }).populate("categoryId");
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("error in getProducts", "PRODUCT ERRER", error);
        return res.status(400).send("Failed to getProducts");
    }
});
exports.getFilteredProducts = getFilteredProducts;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find({}).populate("categoryId");
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("error in getProducts", "PRODUCT ERRER", error);
        return res.status(400).send("Failed to getProducts");
    }
});
exports.getProducts = getProducts;
const uploadSingleImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield uploadImg(req.file);
        return res.status(201).json({ img: url });
    }
    catch (error) {
        console.error("error in upload single image", error);
    }
});
exports.uploadSingleImage = uploadSingleImage;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCoindence = yield productModel_1.default.findOne({
            productCode: req.body.productCode,
        });
        if (checkCoindence)
            return res.status(403).send("Product code coincided");
        const selectedCategory = yield categoryModel_1.default.findOne({
            name: req.body.categoryName,
        });
        if (!selectedCategory)
            return res.status(400).json({ msg: "No category" });
        const newProduct = yield productModel_1.default.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            productCode: req.body.productCode,
            quantity: req.body.quantity,
            tag: req.body.tag,
            disCount: req.body.disCount,
            categoryId: selectedCategory._id,
            subCategoryName: req.body.subCategoryName,
            brandName: req.body.brandName,
            images: req.body.images,
            shopId: req.user.id,
            createdAt: getDateByString(),
            updatedAt: getDateByString(),
        });
        return res.status(201).json({ msg: "product created" });
    }
    catch (error) {
        console.error("error in createProduct", error);
        return res.status(400).json({ msg: "Failed to create" });
    }
});
exports.createProduct = createProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedCategory = yield categoryModel_1.default.findOne({
            name: req.body.categoryName,
        });
        if (!selectedCategory)
            return res.status(400).json({ msg: "No category" });
        const newProduct = yield productModel_1.default.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            productCode: req.body.productCode,
            quantity: req.body.quantity,
            tag: req.body.tag,
            disCount: req.body.disCount,
            categoryId: selectedCategory._id,
            subCategoryName: req.body.subCategoryName,
            brandName: req.body.brandName,
            images: req.body.images,
            shopId: req.user.id,
            createdAt: getDateByString(),
            updatedAt: getDateByString(),
        });
        return res.status(200).json({ msg: "Updated" });
    }
    catch (error) {
        console.error("error in edit product", error);
        return res.status(400).json({ msg: "Failed to update" });
    }
});
exports.editProduct = editProduct;
const getDateByString = () => {
    const date = `${new Date().getFullYear()}` +
        "/" +
        `${new Date().getMonth() + 1}` +
        "/" +
        `${new Date().getDate()}`;
    return date;
};
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
const getProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield productModel_1.default.findById(productId).populate("categoryId");
        return res.status(200).send(product);
    }
    catch (error) {
        console.error("error in getProducts", "PRODUCT ERRER", error);
        return res.status(400).send("Failed to getProducts");
    }
});
exports.getProductDetail = getProductDetail;
const getSelectedProductsInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find({ shopId: req.user.id }).populate("categoryId");
        return res.status(200).send(products);
    }
    catch (error) {
        console.error("error in getSelectedProductsInAdmin", error);
        return res
            .status(400)
            .json({ msg: "Failed to get selected products in admin", error });
    }
});
exports.getSelectedProductsInAdmin = getSelectedProductsInAdmin;
