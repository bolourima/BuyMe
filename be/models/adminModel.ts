import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  shopName: String,
  email: String,
  password: String,
  bankAccount: Number,
  subAdmin: Boolean,
  categories: [{ type: Schema.ObjectId, ref: "Category" }],
});
const Admin = model("Admin", adminSchema);
export default Admin;
