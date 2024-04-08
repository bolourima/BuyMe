import { UserType } from "@/types/userType";
import { editUser } from "@/utilities/editUser";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

export const ProfileInfoEdit = ({
  token,
  img,
  avatar,
  user,
  setOnEdit,
}: {
  token: string;
  img: string;
  avatar: string;
  user: UserType;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const setEdit = (type: boolean) => {
    setOnEdit(type);
  };
  const formik = useFormik({
    initialValues: {
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phoneNumber: Yup.number().required("Required"),
      email: Yup.string().email().required("Required"),
    }),
    onSubmit: (values) => {
      const avatarImg = img && img !== "./waiting.png" ? img : avatar;
      editUser(values, avatarImg, token, setEdit);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col justify-center gap-3">
        <label className="text-xs">First Name</label>
        <input
          className="input bg-white border-gray-300 border-[1px] rounded-md w-[300px] h-[30px] flex items-center pl-5"
          type="text"
          placeholder="First Name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="w-full gap-12 lg:flex">
        <div className="flex flex-col gap-3">
          <label className="text-xs">Phone Number</label>
          <input
            className="input bg-white border-gray-300 border-[1px] rounded-md w-[300px] h-[30px] flex items-center pl-5"
            type="text"
            placeholder="Phone Number"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xs">Email Address</label>
          <input
            className="input bg-white border-gray-300 border-[1px] rounded-md w-[300px] h-[30px] flex items-center pl-5"
            type="text"
            placeholder="Email Address"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
      </div>
      <button
        className="border-black border-[1px] text-black justify-center rounded-xl w-[300px] h-[40px]"
        type="submit"
      >
        Done
      </button>
    </form>
  );
};
