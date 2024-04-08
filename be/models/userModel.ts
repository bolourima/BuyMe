import { Schema, model, models } from "mongoose";
import Address from "./addressModel";

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your Email"],
  },
  phoneNumber: {
    type: Number,
    minlength: 8,
    maxlength: 8,
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Please enter your passport"],
  },
  avatarImg: String,
  addresses: [String],
});
const User = models.Users || model("User", userSchema);
export default User;
