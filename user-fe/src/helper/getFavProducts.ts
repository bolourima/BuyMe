import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { toastifyError } from "@/utilities/toastify";
import { Dispatch, SetStateAction } from "react";

export const getFavProducts = async (
  token: string,
  setProductsInFav: Dispatch<SetStateAction<ProductType[]>>
) => {
  try {
    const res = await instance.get("/favs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProductsInFav(res.data[0].products);
  } catch (error) {
    console.error("Failed to get favorite products", error);
  }
};
