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
exports.deleteProductFromBasket = exports.getBasketById = exports.editBasket = void 0;
const basketModel_1 = __importDefault(require("../models/basketModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const editBasket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const selectedBasket = yield basketModel_1.default.findOne({ user: req.user.id });
        const newProduct = yield productModel_1.default.findById(req.params.id);
        if (!newProduct || !(selectedBasket === null || selectedBasket === void 0 ? void 0 : selectedBasket.products)) {
            return res.status(404).json({ msg: "Product not found" });
        }
        const checkCoincidence = selectedBasket === null || selectedBasket === void 0 ? void 0 : selectedBasket.products.filter((product) => {
            var _a;
            return ((_a = product.product) === null || _a === void 0 ? void 0 : _a.productCode) === newProduct.productCode;
        });
        if ((checkCoincidence === null || checkCoincidence === void 0 ? void 0 : checkCoincidence.length) == 0) {
            const product = {
                product: newProduct,
                selectedProductQuantity: req.body.onDouble ? 2 : 1,
            };
            const result = yield basketModel_1.default.findOneAndUpdate({ user: req.user.id }, { $push: { products: product } }, { new: true });
            return res.status(200).json({ msg: "updated" });
        }
        else {
            const index = selectedBasket === null || selectedBasket === void 0 ? void 0 : selectedBasket.products.findIndex((el) => {
                var _a;
                return ((_a = el.product) === null || _a === void 0 ? void 0 : _a.productCode) === newProduct.productCode;
            });
            const number = selectedBasket.products[index].selectedProductQuantity;
            if (number === null || number === undefined)
                return;
            if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.type) !== false || !req.body) {
                selectedBasket.products[index].selectedProductQuantity = number + 1;
            }
            else {
                selectedBasket.products[index].selectedProductQuantity = number - 1;
            }
            yield selectedBasket.save();
            return res.status(200).send("Updated");
        }
    }
    catch (error) {
        console.error("error in editbasket", error);
        return res.status(400).json({ msg: "Failed to edit basket" });
    }
});
exports.editBasket = editBasket;
const getBasketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const basket = yield basketModel_1.default.findOne({ user: req.user.id }).populate("products");
        return res.status(200).send(basket);
    }
    catch (error) {
        console.error("error in getbasketdata", error);
        return res.status(400).json({ msg: "Failed to get basket" });
    }
});
exports.getBasketById = getBasketById;
const deleteProductFromBasket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findById(req.params.id);
        yield basketModel_1.default.findOneAndUpdate({ user: req.user.id }, {
            $pull: { products: { product: product } },
        });
        return res.status(200).json({ msg: "Deleted" });
    }
    catch (error) {
        console.error("error in deleteProductfrombasket", error);
        return res.status(400).json({ msg: "Failed to delete" });
    }
});
exports.deleteProductFromBasket = deleteProductFromBasket;
