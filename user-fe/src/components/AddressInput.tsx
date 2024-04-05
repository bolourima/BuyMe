import { TokenContext } from "@/context/TokenContext";
import { userInitial } from "@/types/userInitial";
import { UserType } from "@/types/userType";
import { getUserInfo } from "@/utilities/getUserInfo";
import { refresh } from "@/utilities/refreshToken";
import { toastifyWarning } from "@/utilities/toastify";
import { createAddress } from "@/utilities/userRelatedUtils";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";

export const AddressInput = () => {
  const { token, setToken } = useContext(TokenContext);
  const [user, setUser] = useState<UserType>(userInitial);

  const getUser = (data: UserType) => {
    setUser(data);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/signin");
      return toastifyWarning("Please sign in");
    }
    const exp = jwtDecode(accessToken).exp;
    if (!exp) return;
    if (exp < Date.now() / 1000) {
      refresh();
    }
    getUserInfo(accessToken, getUser);
    setToken(accessToken);
  }, []);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      addressName: "",
      city: "",
      district: "",
      khoroo: "",
      building: "",
      deliveryNote: "",
    },
    validationSchema: Yup.object({
      addressName: Yup.string()
        .min(2, "2-с дээш тэмдэгт ашиглана уу")
        .max(30, "30-с бага тэмдэгт оруулна уу"),
      city: Yup.string()
        .min(2, "2-с дээш тэмдэгт ашиглана уу")
        .max(30, "30-с бага тэмдэгт оруулна уу")
        .required("Хотын нэрээ оруулна уу"),
      district: Yup.string()
        .min(2, "2-с дээш тэмдэгт ашиглана уу")
        .max(30, "30-с бага тэмдэгт оруулна уу")
        .required("Дүүргээ оруулна уу"),
      khoroo: Yup.string()
        .min(2, "2-с дээш тэмдэгт ашиглана уу")
        .max(30, "30-с бага тэмдэгт оруулна уу")
        .required("Хороогоо оруулна уу"),
      building: Yup.string()
        .min(2, "2-с дээш тэмдэгт ашиглана уу")
        .max(30, "30-с бага тэмдэгт оруулна уу")
        .required("Байр тоот оо оруулна уу"),
      deliveryNote: Yup.string()
        .min(2, "2-с дээш тэмдэгт ашиглана уу")
        .max(30, "30-с бага тэмдэгт оруулна уу"),
    }),
    onSubmit: (values) => {
      const addressInfo = {
        user: user._id,
        addressName: formik.values.addressName,
        city: formik.values.city,
        district: formik.values.district,
        khoroo: formik.values.khoroo,
        building: formik.values.building,
        deliveryNote: formik.values.deliveryNote,
      };
      createAddress(addressInfo, router.push);
    },
  });
  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
        <div>
          <label className="">Хаягийн нэр</label>
          <input
            className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
            placeholder="Example: Home, Office"
            {...formik.getFieldProps("addressName")}
          />
          {formik.touched.addressName && formik.errors.addressName ? (
            <div>{formik.errors.addressName}</div>
          ) : null}
        </div>
        <div>
          <label className="">Хот</label>
          <input
            className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
            placeholder="Example: Home, Office"
            {...formik.getFieldProps("city")}
          />
          {formik.touched.city && formik.errors.city ? (
            <div>{formik.errors.city}</div>
          ) : null}
        </div>
        <div>
          <label className="">Дүүрэг</label>
          <input
            className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
            placeholder="Example: Home, Office"
            {...formik.getFieldProps("district")}
          />
          {formik.touched.district && formik.errors.district ? (
            <div>{formik.errors.district}</div>
          ) : null}
        </div>
        <div>
          <label className="">Хороо</label>
          <input
            className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
            placeholder="Example: Home, Office"
            {...formik.getFieldProps("khoroo")}
          />
          {formik.touched.khoroo && formik.errors.khoroo ? (
            <div>{formik.errors.khoroo}</div>
          ) : null}
        </div>
        <div>
          <label className="">Байр, Тоот</label>
          <input
            className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
            placeholder="Example: Home, Office"
            {...formik.getFieldProps("building")}
          />
          {formik.touched.building && formik.errors.building ? (
            <div>{formik.errors.building}</div>
          ) : null}
        </div>
        <div>
          <label className="">Нэмэлт мэдээлэл, Орцны код</label>
          <input
            className="w-[300px] h-[40px] p-4 bg-transparent border-gray-500 rounded-md border-[1px]"
            placeholder="Example: Home, Office"
            {...formik.getFieldProps("deliveryNote")}
          />
          {formik.touched.deliveryNote && formik.errors.deliveryNote ? (
            <div>{formik.errors.deliveryNote}</div>
          ) : null}
        </div>
        <button
          className="border-gray-500 rounded-lg bg-gray-500 text-white w-[300px] h-[40px]  mt-5"
          type="submit"
        >
          Next
        </button>
      </form>
    </div>
  );
};
