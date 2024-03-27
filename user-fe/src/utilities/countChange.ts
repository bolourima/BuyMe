import { ProductType } from "@/types/productType";

export const changeProductQuantity = async (
  product: ProductType,
  type: boolean,
  productsInBasket: ProductType[],
  setProductsInBasket: React.Dispatch<React.SetStateAction<ProductType[]>>
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
    const previosProducts: ProductType[] = productsInBasket.filter((el, i) => {
      return i < indexFinder;
    });
    const nextProducts: ProductType[] = productsInBasket.filter((el, i) => {
      return i > indexFinder;
    });
    const newProduct = {
      ...product,
      selectedQuantity: productsInBasket[indexFinder].selectedQuantity + action,
    };
    setProductsInBasket([...previosProducts, newProduct, ...nextProducts]);
  } catch (error) {
    console.error("error in changeProduct count", error);
  }
};
