import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../utilities/userRelatedUtils";
import { instance } from "@/instance";
import { Category } from "@/types/categoryType";

function SignUp({ categoryData }: { categoryData: Category[] }) {
  const router = useRouter();
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const CreateUserBtn = (e: any) => {
    e.preventDefault();
    const accountInfo = {
      shopName: formik.values.name,
      email: formik.values.email,
      bankAccount: formik.values.bankAccount,
      password: formik.values.password,
      subAdmin: true,
      categories: checkedCategories,
    };
    createUser(accountInfo, router.push);
  };

  const handleCheckboxChange = (categoryId: string) => {
    if (checkedCategories.includes(categoryId)) {
      setCheckedCategories(checkedCategories.filter((id) => id !== categoryId));
    } else {
      setCheckedCategories([...checkedCategories, categoryId]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bankAccount: null,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Нэр 30 тэмдэгтээс бага байх ёстой")
        .required("Required"),
      email: Yup.string().email("Буруу емайл байна").required("Required"),
      bankAccount: Yup.number().min(1000000000).max(9999999999),
      password: Yup.string()
        .max(14, "Нууц үг 14 тэмдэгтээс бага байх ёстой")
        .min(4, "Нууц үг 4-ё дээш тэмдэгттэй байх ёстой")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Өмнөх нууц үгтэй ижилхэн байх ёстой")
        .required("Нууц үгээ оруулна уу"),
    }),
    onSubmit: async (values) => {},
  });
  return (
    <div className="flex w-full">
      <div className="w-3/5">
        <img className="rounded-xl w-full" src="./SignUpPic.png" alt="" />
      </div>
      <div className="flex flex-col bg-white w-2/5 gap-2 rounded-r-xl p-[120px]">
        <div className="flex flex-col items-center  font-bold text-2xl">
          <h2 className="text-gray-600 font-bold">Create New Admin Account</h2>
          <p className="text-sm ">Please enter details</p>
        </div>
        <div>
          <form
            onSubmit={CreateUserBtn}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col gap-2">
              <label className="font-bold">Shop name </label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type="text"
                placeholder="Please enter your name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
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
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Bank account</label>
              <input
                className="input input-bordered max-w-xs w-[300px]"
                type="number"
                placeholder="Please enter your bankAccount"
                {...formik.getFieldProps("bankAccount")}
              />
              {formik.touched.bankAccount && formik.errors.bankAccount ? (
                <div>{formik.errors.bankAccount}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
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
            </div>
            <div className="flex flex-col gap-2">
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
            </div>
            <div>
              {categoryData.map((el) => {
                return (
                  <label key={el._id} className="flex">
                    <input
                      type="checkbox"
                      checked={checkedCategories.includes(el._id)}
                      onChange={() => handleCheckboxChange(el._id)}
                    />
                    <p>{el.name}</p>
                  </label>
                );
              })}
            </div>
            <button type="submit" className="btn btn-neutral mt-5">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const res = await instance.get("/getCategories");
  const categoryData = res.data;
  return {
    props: { categoryData },
  };
};
export default SignUp;
