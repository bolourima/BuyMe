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
exports.editSubCategories = exports.getSubCategories = void 0;
const subCategoryModel_1 = __importDefault(require("../models/subCategoryModel"));
const getSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    try {
        const subCategories = yield subCategoryModel_1.default.find().populate("category");
        const subs = subCategories.filter((el) => {
            return el.category.name === name;
        });
        return res.status(200).send(subs);
    }
    catch (error) {
        console.error(error);
        return res.status(400).send("failed");
    }
});
exports.getSubCategories = getSubCategories;
const editSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            "-" +
            S4() +
            S4() +
            S4());
    }
    const brandId = guidGenerator();
    const { subName, brandName } = req.body;
    const selectedSub = yield subCategoryModel_1.default.findOneAndDelete({ name: subName });
    const brand = [{ name: brandName, _id: brandId }];
    const sub = yield subCategoryModel_1.default.create({
        _id: selectedSub === null || selectedSub === void 0 ? void 0 : selectedSub._id,
        name: subName,
        category: selectedSub === null || selectedSub === void 0 ? void 0 : selectedSub.category,
        brands: brand,
    });
    return res.status(200).send("success");
});
exports.editSubCategories = editSubCategories;
