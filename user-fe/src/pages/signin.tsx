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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="lg:flex md:flex  sm:flex">
      <div className=" lg:flex md:flex md:w-3/5 sm:w-full hidden">
        <img className="rounded-bl-xl w-full" src="./SignUpPic.png" alt="" />
      </div>
      <div className="lg:flex flex p-10 flex-col md:flex md:w-2/5  sm:w-full items-center">
        <div className="lg:flex-col items-center sm:flex-col  sm:flex">
          <h2 className="text-gray-100 font-bold">Signin your Account</h2>
        </div>
        <div>
          <div className="flex gap-4 md:flex sm:flex flex-col items-center mt-5">
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="font-bold">Email</label>
              <input
                className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
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
                className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
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
            <div className=" lg:flex gap-3 sm:flex justify-center ">
              <p className="text-slate-900 text-base font-normal dark:text-slate-300">
                Don’t have account?
              </p>
              <Link href={"./signup"}>
                <p className=" text-base font-normal cursor-pointer hover:text-blue-400 justify-center">
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
