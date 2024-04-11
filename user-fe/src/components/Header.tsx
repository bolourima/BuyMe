import { MyCartIcon, OrderIcon, ProfileIcon, SearchIcon } from "@/icon";

import { useRouter } from "next/router";

import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { TokenContext } from "@/context/TokenContext";
import { toastifyWarning } from "@/utilities/toastify";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/utilities/refreshToken";
import { MobileBar } from "./MobileBar";
import { SearchInputContext } from "@/context/searchContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { instance } from "@/instance";

export const Header = () => {
  const { searchedProduct, setSearchedProduct } =
    useContext(SearchInputContext);
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const [showInput, setShowInput] = useState(false);
  const formik = useFormik({
    initialValues: {
      input: "",
    },
    validationSchema: Yup.object({
      input: Yup.string().max(20),
    }),
    onSubmit: async () => {
      if (!formik.values.input) return router.push("/");
      const response = await instance.post("getProducts", {
        input: formik.values.input,
      });
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
    <div
      className={`text-black dark:w-full lg:w-full flex justify-center py-4 bg-white lg:sticky top-0 z-50 shadow ${
        router.asPath === "/" ? "lg:mb-4" : "mb-10"
      }`}
    >
      <div className=" SideBar  flex lg:flex items-center w-10/12 place-content-between  ">
        <div className=" block  lg:hidden">
          <MobileBar />
        </div>
        <div>
          <Link href={"/"}>
            <div className="flex hover:shadow-sm">
              <h1 className=" font-extrabold text-4xl">Buy</h1>
              <h1 className="  font-semibold text-2xl content-end">me</h1>
            </div>
          </Link>
        </div>
        <div className=" hidden lg:flex w-10/12 justify-center  gap-6 items-center  ">
          <Link href={"/"}>
            <h1
              className={`font-semibold text-xl ${
                router.asPath === "/"
                  ? "font-bold"
                  : "font-normal text-zinc-500"
              }`}
            >
              Home
            </h1>
          </Link>
          <Link href={"/productlist"}>
            <h1
              className={`lg:content-center text-xl flex items-center font-semibold gap-2 hover:border p-2 rounded-md ${
                router.asPath === "/productlist"
                  ? "font-bold"
                  : "font-normal text-zinc-500"
              }`}
            >
              All products
            </h1>
          </Link>
        </div>
        <div>
          <div className=" relative lg:flex gap-6 items-center">
            <div className=" hidden lg:flex gap-6 items-center">
              <form
                className="flex justify-center items-center"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className={`border p-2 rounded absolute right-40 btnn ${
                    showInput ? "block" : "hidden"
                  }`}
                  {...formik.getFieldProps("input")}
                />
                <button
                  className="cursor-pointer"
                  onClick={() => setShowInput(!showInput)}
                  type="submit"
                >
                  <SearchIcon />
                </button>
              </form>
              <button
                onClick={() => router.push("/favorites")}
                className="w-4 h-4 btnn"
              >
                <OrderIcon />
              </button>

              <button
                className="btnn"
                onClick={() => {
                  if (!token) {
                    toastifyWarning("Please sign in"), router.push("/signin");
                  } else router.push("/myprofile");
                }}
              >
                <ProfileIcon />
              </button>
            </div>
            <div className=" flex ">
              {" "}
              <button
                className="btnn"
                onClick={() => {
                  if (!token) toastifyWarning("Please sign in");
                  else router.push("/basket");
                }}
              >
                <MyCartIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
