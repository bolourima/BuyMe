import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { toastifyError } from "./toastify";

export const changeProductQuantity = async (
  product: ProductTypeWithQuantity,
  type: boolean,
  productsInBasket: ProductTypeWithQuantity[],
  setProductsInBasket: React.Dispatch<
    React.SetStateAction<ProductTypeWithQuantity[]>
  >,
  token: string
) => {
  try {
    const action = type ? 1 : -1;
    let indexFinder: number = 0;
    for (let i = 0; i < productsInBasket.length; i++) {
      if (product._id === productsInBasket[i]._id) {
        indexFinder = i;
        break;
      }
    }
    const previosProducts: ProductTypeWithQuantity[] = productsInBasket.filter(
      (el, i) => {
        return i < indexFinder;
      }
    );
    const nextProducts: ProductTypeWithQuantity[] = productsInBasket.filter(
      (el, i) => {
        return i > indexFinder;
      }
    );
    const newProduct = {
      product: product.product,
      _id: product._id,
      selectedProductQuantity: product.selectedProductQuantity + action,
    };
    setProductsInBasket([...previosProducts, newProduct, ...nextProducts]);
    const res = await instance.put(
      `/basket/${product.product._id}`,
      {
        type: type,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    toastifyError("error in changeProduct count");
  }
};
