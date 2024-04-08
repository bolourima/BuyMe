import { Schema, model } from "mongoose";

const favoritesSchema = new Schema({
  products: [{ type: Schema.ObjectId, ref: "Product", required: true }],
  user: { type: Schema.ObjectId, ref: "User", required: true },
  addedAt: { type: Date, required: true },
});
const Favorites = model("Favorite", favoritesSchema);
export default Favorites;
