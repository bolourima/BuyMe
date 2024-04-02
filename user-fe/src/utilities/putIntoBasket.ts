import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { toastifyError, toastifySuccess } from "./toastify";
import { jwtDecode } from "jwt-decode";
const test = async () => {
  const res = await instance.get("/refreshToken");
  localStorage.setItem("accessToken", res.data.accessToken);
};
export const putIntoBasket = async (
  product: ProductType,
  productsInBasket: ProductTypeWithQuantity[],
  setProductsInBasket: React.Dispatch<
    React.SetStateAction<ProductTypeWithQuantity[]>
  >,
  token: string,
  onDouble: boolean
) => {
  try {
    const res = await instance.put(`/basket/${product._id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 200) toastifySuccess("Added to Cart");
  } catch (error) {
    console.error("error in put into basket", error);
    toastifyError("Failed to add into cart");
  }

  // const coincidenceChecker: ProductTypeWithQuantity[] = productsInBasket.filter(
  //   (el) => {
  //     return el._id === product._id;
  //   }
  // );
  // if (coincidenceChecker.length == 0) {
  //   setProductsInBasket([
  //     ...productsInBasket,
  //     { ...product, selectedProductQuantity: 1 },
  //   ]);
  // } else {
  //   let indexFinder: number = 0;
  //   for (let i = 0; i < productsInBasket.length; i++) {
  //     if (product._id === productsInBasket[i]._id) {
  //       indexFinder = i;
  //       break;
  //     }
  //   }
  //   const newProduct = {
  //     ...product,
  //     selectedQuantity:
  //       productsInBasket[indexFinder].selectedProductQuantity + 1,
  //   };
  //   const previosProducts: ProductTypeWithQuantity[] = productsInBasket.filter(
  //     (el, i) => {
  //       return i < indexFinder;
  //     }
  //   );
  //   const nextProducts: ProductTypeWithQuantity[] = productsInBasket.filter(
  //     (el, i) => {
  //       return i > indexFinder;
  //     }
  //   );
  //   setProductsInBasket([...previosProducts, newProduct, ...nextProducts]);
  // }
};
