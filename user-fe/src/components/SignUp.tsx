import React, { useState } from "react";
import { EyeOff } from "../icon/EyeOff";
import { useRouter } from "../../node_modules/next/router";
import { Formik, useFormik } from "formik";
import { signUpValidation } from "../pages/signUpValidation";
import * as Yup from "yup";
import { instance } from "../instance";

const SignUp = () => {
  const router = useRouter();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        rePassword: "",
      },
      validationSchema: signUpValidation,
      onSubmit: () => {},
    });

  const signUpUser = async () => {
    try {
      const user = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
      };
      console.log(user);
      const res = await instance.post("/signup", user);

      if (res.status === 201) {
        return router.push("./signup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex absolute z-30">
      <div className="w-3/5">
        <img className="rounded-l-xl" src="./SignUpPic.png" alt="" />
      </div>
      <div className="flex flex-col bg-white w-2/5 gap-2 rounded-r-xl p-[120px]">
        <div className="flex flex-col justify-center  font-bold text-2xl">
          <h2 className="text-gray-600 font-bold">Create New Account</h2>
          <p className="text-sm ">Please enter details</p>
        </div>
        <div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Name </label>
              <input
                id="name"
                defaultValue={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] h-8 bg-stone-100 rounded-sm pl-2 border-gray-600 border-[1px]"
                type="text"
                placeholder="Please enter your name"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-[12px]">{errors.name}</p>
              )}
            </div>

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
              <label className="font-bold">Phone Number </label>

              <input
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[300px] h-8 bg-stone-100 rounded-sm pl-2 border-gray-600 border-[1px]"
                type=""
                placeholder="Please enter your phone number"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-red-500 text-[12px]">{errors.phoneNumber}</p>
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

            <div className="flex flex-col gap-2">
              <label className="font-bold">RePassword </label>
              <div className="flex w-[300px] h-8 bg-stone-100 rounded-sm pl-2 pr-5 items-center justify-between border-gray-600 border-[1px]">
                <input
                  id="repassword"
                  value={values.rePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-[300px] h-7 bg-stone-100 rounded-sm "
                  type="text"
                  placeholder="Please enter your password again"
                />

                {errors.rePassword && touched.rePassword && (
                  <p className="text-red-500 text-[12px]">
                    {errors.rePassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <input className="bg-gray-600" type="checkbox" />
              <label className="">Үйлчилгээний нөхцөл зөвшөөрөх</label>
            </div>
            <div>
              <button
                onClick={signUpUser}
                className="flex w-[300px] h-10 bg-gray-600 rounded-sm text-white justify-center items-center"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
