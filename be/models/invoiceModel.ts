import { Schema, model } from "mongoose";

const invoiceSchema = new Schema({
  id: String,
  user: { type: String, ref: "User", required: true },
  idPaid: Boolean,
  createdAt: Date,
});
const Invoice = model("Invoice", invoiceSchema);
export default Invoice;
