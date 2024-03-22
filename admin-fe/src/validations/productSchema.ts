import * as yup from "yup";
export const productSchema = yup.object().shape({
  name: yup.string().min(2).max(30).required("Product name required!"),
  description: yup
    .string()
    .min(2)
    .max(500)
    .required("Product description required!"),
  productCode: yup.number().min(0).required("Product code required"),
  price: yup.number().min(0).required("Price required!"),
  quantity: yup.number().min(0).required("Quantity required!"),
  tag: yup.string().min(2).max(100).required("Tag required!"),
});
