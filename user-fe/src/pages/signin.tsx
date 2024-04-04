import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../utilities/userRelatedUtils";
import Link from "next/link";
import { TokenContext } from "@/context/TokenContext";
import { toastifyWarning } from "@/utilities/toastify";
export default function SignIn() {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
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
      loginUser(accountInfo, router.push, setToken);
    },
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setToken(accessToken);
    toastifyWarning("You are already signed in");
    router.push("/");
  }, []);
  return (
    <div className="lg:flex w-full h-full md:flex  sm:flex">
      <div
        className=" lg:flex w-full h-full bg-center bg-cover md:flex md:w-3/5 sm:w-full hidden"
        style={{
          backgroundImage: `url(https://assets.teenvogue.com/photos/633dbbb29407f031a64abb0a/16:9/w_2560%2Cc_limit/220801-05_0943_03_QC_EXT.jpg`,
        }}
      >
        <div className="w-full h-screen p-10 ">
          <div className="flex ">
            <h1 className=" text-9xl font-semibold">Buy</h1>
            <h1 className=" text-7xl content-end ">me</h1>
          </div>
        </div>
      </div>
      <div className="lg:flex flex p-10 items-center justify-center  flex-col md:flex md:w-2/5  sm:w-full sm:items-center">
        <div className="lg:flex-col items-center sm:flex-col  sm:flex">
          <h2 className="text-black font-bold">Signin your Account</h2>
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
