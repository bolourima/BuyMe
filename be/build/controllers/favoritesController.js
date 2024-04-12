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
exports.removeFromFavs = exports.getFavs = exports.addToFavorites = exports.createFav = void 0;
const favoritesModel_1 = __importDefault(require("../models/favoritesModel"));
const mongoose_1 = require("mongoose");
const createFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favoritesModel_1.default.findOne({ user: req.user.id });
    if (result)
        return (0, exports.addToFavorites)(req, res);
    try {
        yield favoritesModel_1.default.create({
            user: req.user.id,
            products: [],
            addedAt: new Date(),
        });
        return yield (0, exports.addToFavorites)(req, res);
    }
    catch (error) {
        console.error("error in create fav", error);
        return res.status(400).json({ err: error });
    }
});
exports.createFav = createFav;
const addToFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fav = yield favoritesModel_1.default.findOne({ user: req.user.id });
        const checkCoincidence = fav === null || fav === void 0 ? void 0 : fav.products.filter((product) => {
            return product._id.toString() === req.body.productId;
        });
        if ((checkCoincidence === null || checkCoincidence === void 0 ? void 0 : checkCoincidence.length) != 0) {
            yield favoritesModel_1.default.findOneAndUpdate({ user: req.user.id }, { $pull: { products: new mongoose_1.Types.ObjectId(req.body.productId) } }, { new: true });
            return res.status(208).json({ msg: "removed" });
        }
        yield favoritesModel_1.default.findOneAndUpdate({ user: req.user.id }, { $push: { products: req.body.productId } }, { new: true });
        return res.status(200).json({ msg: "Added" });
    }
    catch (error) {
        console.error("error in add to favorites", error);
        return res.status(400).json({ err: error });
    }
});
exports.addToFavorites = addToFavorites;
const getFavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favs = yield favoritesModel_1.default.find({ user: req.user.id }).populate("products");
        return res.status(200).send(favs);
    }
    catch (error) {
        console.error("error in get favs", error);
        return res.status(400).json({ err: error });
    }
});
exports.getFavs = getFavs;
const removeFromFavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield favoritesModel_1.default.findOneAndUpdate({ user: req.user.id }, { $pull: { products: new mongoose_1.Types.ObjectId(req.params.id) } }, { new: true });
        return res.status(200).json({ msg: "removed" });
    }
    catch (error) {
        console.error("error in remove fav", error);
        return res.status(400).json({ err: error });
    }
});
exports.removeFromFavs = removeFromFavs;
