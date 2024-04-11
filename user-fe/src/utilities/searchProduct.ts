import { instance } from "@/instance";
import { toastifyWarning, toastifyError } from "./toastify";
import { ProductType } from "@/types/productType";

export const SearchProduct = async (
  searchInput: string,
  setSearchedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  try {
    const response = await instance.post("getProducts", { input: searchInput });
    setSearchedProduct(response.data);
  } catch (error) {
    return toastifyError("noting to search");
  }
};
export const filterWithCategory = async (
  value: number[],
  setSearchedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  try {
    const response = await instance.post(
      `/getProducts/:category/:subcategory`,
      { inputValue: value }
    );
    setSearchedProduct(response.data);
  } catch (error) {
    return toastifyError("filterSubCategory Error");
  }
};
