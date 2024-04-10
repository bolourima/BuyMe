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
    console.log("search", searchInput);
    const response = await instance.post("getProducts", { input: searchInput });
    setSearchedProduct(response.data);
  } catch (error) {
    return toastifyError("noting to search");
  }
};
export const filterWithCategory = async (
  filterInput: string,
  category: string,
  setFilteredProduct: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  try {
    if (!filterInput) {
      return;
    }
    const response = await instance.post(`/getProducts/${category}`, {
      input: filterInput,
    });
  } catch (error) {
    return toastifyError("filterSubCategory Error");
  }
};
