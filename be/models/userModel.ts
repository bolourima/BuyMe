import { Schema, model } from "mongoose";

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
});
const User = model("User", userSchema);
export default User;
