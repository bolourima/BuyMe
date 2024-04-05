import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  addressName: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: [true, "Please enter your address name"],
  },
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
  deliveryNote: {
    type: String,
    maxlength: 30,
    minlength: 3,
  },
});
const Address = model("Address", addressSchema);
export default Address;
