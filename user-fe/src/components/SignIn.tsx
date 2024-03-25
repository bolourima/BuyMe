import React, { useState } from "react";
import { EyeOff } from "@/icon/EyeOff";
import { useRouter } from "../../node_modules/next/router";
import { Formik, useFormik } from "formik";
import { signUpValidation } from "@/pages/signUpValidation";
import * as Yup from "yup";
import { instance } from "@/instance";

const SignIn = () => {
  const router = useRouter();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signUpValidation,
      onSubmit: () => {},
    });

  const signInUser = async () => {
    try {
      const user = {
        email: values.email,
        password: values.password,
      };
      console.log(user);
      const res = await instance.post("/signin", user);
      if (res.status === 201) {
        return router.push("./signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex absolute z-30">
      <div className="w-3/5">
        <img className="rounded-l-xl " src="./SignUpPic.png" alt="" />
      </div>
      <div className="flex flex-col bg-white w-2/5 gap-4 rounded-r-xl p-[130px]">
        <div className="flex flex-col justify-center  font-bold text-2xl">
          <h2 className="text-gray-600 font-bold">Sign in</h2>
        </div>
        <div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Email</label>

              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] h-8 bg-stone-100 rounded-sm pl-2 border-gray-600 border-[1px] "
                type="text"
                placeholder="Please enter your email address"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-[12px]">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold">Password </label>
              <div className="flex w-[300px] h-8 bg-stone-100 rounded-sm pl-2 pr-5 items-center justify-between border-gray-600 border-[1px]">
                <input
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px] h-7 bg-stone-100 rounded-xl"
                  type="password"
                  placeholder="Please enter your password"
                />

                {errors.password && touched.password && (
                  <p className="text-red-500 text-[12px]">{errors.password}</p>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={signInUser}
                className="flex w-[300px] h-10 bg-gray-600 rounded-sm text-white justify-center items-center"
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
