import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  password: String,
});
const User = model("User", userSchema);
export default User;
