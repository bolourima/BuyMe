import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { toastifyError, toastifySuccess } from "./toastify";
export const putIntoBasket = async (product: ProductType, token: string) => {
  try {
    const res = await instance.put(`/basket/${product._id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toastifySuccess("Added to Cart");
  } catch (error) {
    console.error("error in put into basket", error);
    toastifyError("Failed to add into cart");
  }
};
