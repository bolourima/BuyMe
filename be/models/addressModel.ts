import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  district: {
    type: String,
    maxlength: 30,
    required: [true, "Please enter your District"],
  },
  building: {
    type: String,
    maxlength: 30,
    required: [true, "Please enter your Building"],
  },
  deliveryNote: {
    type: String,
    maxlength: 30,
  },
});
const Address = models.Address || model("Address", addressSchema);
export default Address;
