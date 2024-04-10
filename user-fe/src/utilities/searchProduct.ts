import { instance } from "@/instance";
import { toastifyWarning, toastifyError } from "./toastify";
import { ProductType } from "@/types/productType";

export const SearchProduct = async (
  searchInput: string,
  setSearchedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  try {
    if (!searchInput) {
      return toastifyError("noting to search");
    }
    const response = await instance.post("getProducts", { input: searchInput });
    setSearchedProduct(response.data);
  } catch (error) {
    return toastifyError("noting to search");
  }
};
