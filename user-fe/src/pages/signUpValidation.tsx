import * as Yup from "yup";

export const signUpValidation = Yup.object({
  name: Yup.string().min(3).required("Please Enter name"),
  email: Yup.string()
    .email("Please Enter valid email")
    .required("Please enter email"),
  phoneNumber: Yup.number().min(8).required("Please enter phone number"),

  password: Yup.string().min(10).required("Please enter password"),
  rePassword: Yup.string()
    .min(10)
    .required("Please enter password")
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter password"),
});
