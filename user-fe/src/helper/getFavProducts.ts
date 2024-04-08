import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { toastifyError } from "@/utilities/toastify";

export const getFavProducts = async (
  token: string,
  setFavs: (products: ProductType[]) => void
) => {
  try {
    const res = await instance.get("/favs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavs(res.data[0].products);
  } catch (error) {
    console.error("Failed to get favorite products", error);
    toastifyError("Failed to get favorite products");
  }
};
