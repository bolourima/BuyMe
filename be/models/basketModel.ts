import { Schema, model } from "mongoose";
import { SelectedProductSchema } from "./orderModel";

const basketSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  products: [SelectedProductSchema],
});
const Basket = model("Basket", basketSchema);
export default Basket;
