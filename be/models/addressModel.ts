import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  city: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, "Please enter your city"],
  },
  district: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: [true, "Please enter your District"],
  },
  khoroo: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: [true, "Please enter your Khoroo"],
  },
  building: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, "Please enter your Building"],
  },
});
const Address = model("Address", addressSchema);
export default Address;
