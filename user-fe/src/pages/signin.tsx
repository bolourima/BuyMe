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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(14, "Нууц үг 14 тэмдэгтээс бага байх ёстой")
        .min(4, "Нууц үг 4-ё дээш тэмдэгттэй байх ёстой")
        .required("Нууц үгээ оруулна уу"),
    }),
    onSubmit: (values) => {
      const accountInfo = {
        email: formik.values.email,
        password: formik.values.password,
      };
      loginUser(accountInfo, router.push);
    },
  });
  return (
    <div className="flex w-full">
      <div className="w-3/5">
        <img className="rounded-l-xl w-full" src="./SignUpPic.png" alt="" />
      </div>
      <div className="flex flex-col bg-white w-2/5 gap-2 rounded-r-xl p-[120px]">
        <div className="flex flex-col items-center  font-bold text-2xl">
          <h2 className="text-gray-600 font-bold">Sign in</h2>
          <p className="text-sm ">Please enter details</p>
        </div>
        <div>
          <div className="flex flex-col items-center gap-4">
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
              <button className="btn btn-neutral mt-5" type="submit">
                Signin
              </button>
            </form>
            <div className="flex gap-2">
              <p className="text-slate-900 text-base font-normal dark:text-slate-300">
                Don’t have account?
              </p>
              <Link href={"./signup"}>
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
