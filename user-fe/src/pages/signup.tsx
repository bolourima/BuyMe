import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../utilities/userRelatedUtils";

export default function SignUp() {
  const router = useRouter();
  const CreateUserBtn = () => {
    const accountInfo = {
      name: formik.values.name,
      email: formik.values.email,
      phoneNumber: formik.values.phoneNumber,
      password: formik.values.password,
    };
    createUser(accountInfo, router.push);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Нэр 30 тэмдэгтээс бага байх ёстой")
        .required("Required"),
      email: Yup.string().email("Буруу емайл байна").required("Required"),
      phoneNumber: Yup.number().min(8).required("Required"),
      password: Yup.string()
        .max(14, "Нууц үг 14 тэмдэгтээс бага байх ёстой")
        .min(4, "Нууц үг 4-ё дээш тэмдэгттэй байх ёстой")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Өмнөх нууц үгтэй ижилхэн байх ёстой")
        .required("Нууц үгээ оруулна уу"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex w-full">
      <div className="w-3/5">
        <img className="rounded-l-xl w-full" src="./SignUpPic.png" alt="" />
      </div>
      <div className="flex flex-col bg-white w-2/5 gap-2 rounded-r-xl p-[120px]">
        <div className="flex flex-col items-center  font-bold text-2xl">
          <h2 className="text-gray-600 font-bold">Create New Account</h2>
          <p className="text-sm ">Please enter details</p>
        </div>
        <div>
          <div className="flex flex-col items-center gap-4">
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-bold">Name </label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type="text"
                placeholder="Please enter your name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </form>
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-bold">Email</label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type="email"
                placeholder="Please enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </form>
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-bold">Phone Number </label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type=""
                placeholder="Please enter your phone number"
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div>{formik.errors.phoneNumber}</div>
              ) : null}
            </form>
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-bold">Password </label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type="password"
                placeholder="Please enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </form>
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-bold">RePassword </label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type="password"
                placeholder="Please enter your password again"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
              <button
                className="btn btn-neutral mt-5"
                onClick={() => CreateUserBtn()}
                type="submit"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
