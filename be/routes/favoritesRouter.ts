import { Router } from "express";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";
import {
  addToFavorites,
  createFav,
  getFavs,
  removeFromFavs,
} from "../controllers/favoritesController";

export const favoritesRouter = Router();
favoritesRouter
  .route("/removeFromFavs/:id")
  .delete(accessTokenAuth, removeFromFavs);
favoritesRouter
  .route("/favs")
  .post(accessTokenAuth, createFav)
  .get(accessTokenAuth, getFavs);
