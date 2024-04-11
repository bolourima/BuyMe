import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  shopName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bankAccount: { type: Number, required: true },
  subAdmin: { type: String, required: true },
  categories: [{ type: Schema.ObjectId, ref: "Category" }],
  description: { type: String, required: true },
});
const Admin = model("Admin", adminSchema);
export default Admin;
