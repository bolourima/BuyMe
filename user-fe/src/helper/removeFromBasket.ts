import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { toastifyError, toastifySuccess } from "@/utilities/toastify";
import { Dispatch, SetStateAction } from "react";

export const removeFromFavs = async (
  token: string,
  id: string,
  productsInFav: ProductType[],
  setProductsInFav: Dispatch<SetStateAction<ProductType[]>>
) => {
  try {
    const survivers = productsInFav.filter((product) => {
      return product._id !== id;
    });
    setProductsInFav(survivers);
    const res = await instance.delete(`/removeFromFavs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toastifySuccess("Removed from favs");
  } catch (error) {
    toastifyError("Failed to remove from favs");
  }
};
