import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../utilities/userRelatedUtils";
import Link from "next/link";
import { TokenContext } from "@/context/TokenContext";
import { toastifyWarning } from "@/utilities/toastify";
export default function SignUp() {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
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
        .max(30, "Нууц үг 30 тэмдэгтээс бага байх ёстой")
        .min(4, "Нууц үг 4-c дээш тэмдэгттэй байх ёстой")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Өмнөх нууц үгтэй ижилхэн байх ёстой")
        .required("Нууц үгээ оруулна уу"),
    }),
    onSubmit: (values) => {},
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setToken(accessToken);
    if (accessToken) {
      toastifyWarning("You are already signed in");
      router.push("/");
    }
  }, []);
  return (
    <div className="lg:flex md:flex  sm:flex">
      <div
        className=" lg:flex w-full h-full bg-center bg-cover md:flex md:w-3/5 sm:w-full hidden"
        style={{
          backgroundImage: `url(https://assets.teenvogue.com/photos/633dbbb29407f031a64abb0a/16:9/w_2560%2Cc_limit/220801-05_0943_03_QC_EXT.jpg`,
        }}
      >
        <div className="w-full h-screen p-10 ">
          <div className="flex ">
            <h1 className=" text-9xl font-semibold">Buy</h1>
            <h1 className=" text-7xl content-end text-white">me</h1>
          </div>
        </div>
      </div>

      <div className="lg:flex flex p-10 flex-col md:flex md:w-2/5  sm:w-full items-center">
        <div className="lg:flex-col items-center sm:flex-col  sm:flex">
          <h2 className="text-black text-xl">Create New Account</h2>
          <p className="text-xs ">Please enter details</p>
        </div>
        <div>
          <div className="flex gap-4 md:flex sm:flex flex-col items-center">
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <label className="">Name </label>
              <input
                className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
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
              <label className="">Email</label>
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
              <label className="">Phone Number </label>
              <input
                className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
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
              <label className="">Password </label>
              <input
                className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
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
              <label className="">RePassword </label>
              <input
                className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
                type="password"
                placeholder="Please enter your password again"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
              <button
                className="bg-black hover:bg-gray-400 hover:text-black hover:font-bold rounded-lg text-white w-[300px] h-[40px]  mt-5"
                onClick={() => CreateUserBtn()}
                type="submit"
              >
                Signup
              </button>
            </form>
            <div className="flex gap-4">
              <p className="text-slate-900 text-base font-normal dark:text-slate-300">
                Already have an account?
              </p>
              <Link href={"./signin"}>
                <p className=" text-base font-normal cursor-pointer hover:text-blue-400">
                  Log in
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
