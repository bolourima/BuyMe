"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesRouter = void 0;
const express_1 = require("express");
const accessTokenAuth_1 = require("../middlewares/accessTokenAuth");
const favoritesController_1 = require("../controllers/favoritesController");
exports.favoritesRouter = (0, express_1.Router)();
exports.favoritesRouter
    .route("/removeFromFavs/:id")
    .delete(accessTokenAuth_1.accessTokenAuth, favoritesController_1.removeFromFavs);
exports.favoritesRouter
    .route("/favs")
    .post(accessTokenAuth_1.accessTokenAuth, favoritesController_1.createFav)
    .get(accessTokenAuth_1.accessTokenAuth, favoritesController_1.getFavs);
