import { SearchInputContext } from "@/context/searchContext";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { instance } from "@/instance";
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "@/context/TokenContext";
import { refresh } from "@/utilities/refreshToken";

export const SearchMobile = () => {
  const router = useRouter();
  const { searchedProduct, setSearchedProduct } =
    useContext(SearchInputContext);
  const { token, setToken } = useContext(TokenContext);
  const formik = useFormik({
    initialValues: {
      input: "",
    },
    validationSchema: Yup.object({
      input: Yup.string().max(20).required(),
    }),
    onSubmit: async () => {
      const response = await instance.post("getProducts", {
        input: formik.values.input,
      });
      console.log("resdata", response.data);
      router.push("/productlist");
      setSearchedProduct(response.data);
    },
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    const exp = jwtDecode(accessToken).exp;
    if (!exp) return;
    if (exp < Date.now() / 1000) refresh();
    setToken(accessToken);
  }, []);
  return (
    <div className="lg:hidden block">
      <div className="w-full border-2 mb-4 rounded p-1">
        <form
          onSubmit={formik.handleSubmit}
          className="flex justify-center items-center w-full gap-2 "
        >
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded w-5/6"
            {...formik.getFieldProps("input")}
          />
          <button
            className="w-1/6 flex justify-center items-center"
            type="submit"
          >
            <SearchIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
