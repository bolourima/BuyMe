import React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../utilities/userRelatedUtils";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      shopName: "",
      password: "",
    },
    validationSchema: Yup.object({
      shopName: Yup.string().required("Required"),
      password: Yup.string()
        .max(14, "Нууц үг 14 тэмдэгтээс бага байх ёстой")
        .min(4, "Нууц үг 4-ё дээш тэмдэгттэй байх ёстой")
        .required("Нууц үгээ оруулна уу"),
    }),
    onSubmit: (values) => {
      const accountInfo = {
        shopName: formik.values.shopName,
        password: formik.values.password,
      };
      loginUser(accountInfo, router.push);
    },
  });
  return (
    <div className="flex h-screen justify-center items-center bg-cover bg-[url('/screenshot2.png')]">
      <div className="flex flex-col bg-gray-100 gap-2 rounded-2xl p-5">
        <div className="flex flex-col items-center  font-bold text-2xl">
          <h2 className="text-black font-bold">Login</h2>
        </div>
        <div>
          <div className="flex flex-col items-center gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="">Shop Name</label>
              <input
                className="w-[300px] h-[30px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
                type="shopName"
                placeholder="Please enter your shopName"
                {...formik.getFieldProps("shopName")}
              />
              {formik.touched.shopName && formik.errors.shopName ? (
                <div>{formik.errors.shopName}</div>
              ) : null}
            </form>
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="">Password </label>
              <input
                className="w-[300px] h-[30px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
                type="password"
                placeholder="Please enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
              <button
                className="bg-black hover:bg-gray-400 hover:text-black hover:font-bold rounded-lg text-white w-[300px] h-[30px]  mt-5"
                type="submit"
              >
                Signin
              </button>
            </form>
            <div className="flex gap-2">
              <p className="text-slate-900 text-base font-normal dark:text-slate-300">
                Don’t have account?
              </p>
              <Link href={"/signup"}>
                <p className=" text-base font-normal cursor-pointer hover:text-blue-400">
                  Sign up
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
