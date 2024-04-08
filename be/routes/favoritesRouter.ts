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
  .route("/favs")
  .post(accessTokenAuth, createFav)
  .get(accessTokenAuth, getFavs)
  .delete(accessTokenAuth, removeFromFavs);
