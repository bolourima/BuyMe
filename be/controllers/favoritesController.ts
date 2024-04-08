import { Response } from "express";
import { AuthenticatedRequest } from "./basketController";
import Favorites from "../models/favoritesModel";
export const createFav = async (req: AuthenticatedRequest, res: Response) => {
  const result = await Favorites.findOne({ user: req.user.id });
  if (result) return addToFavorites(req, res);
  try {
    await Favorites.create({
      user: req.user.id,
      products: [],
      addedAt: new Date(),
    });
    await addToFavorites(req, res);
    return res.status(201).json({ msg: "Created" });
  } catch (error) {
    console.error("error in create fav", error);
    return res.status(400).json({ err: error });
  }
};
export const addToFavorites = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    await Favorites.findOneAndUpdate(
      { user: req.user.id },
      { $push: { products: req.body.productId } },
      { new: true }
    );
    return res.status(200).json({ msg: "Added" });
  } catch (error) {
    console.error("error in add to favorites", error);
    return res.status(400).json({ err: error });
  }
};
export const getFavs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const favs = await Favorites.find({ user: req.user.id }).populate(
      "products.product"
    );
    return res.status(200).send(favs);
  } catch (error) {
    console.error("error in get favs", error);
    return res.status(400).json({ err: error });
  }
};
export const removeFromFavs = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    await Favorites.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: { product: req.body.productId } } },
      { new: true }
    );
    return res.status(200).json({ msg: "removed" });
  } catch (error) {
    console.error("error in remove fav", error);
    return res.status(400).json({ err: error });
  }
};
