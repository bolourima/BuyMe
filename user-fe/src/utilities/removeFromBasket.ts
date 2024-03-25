import { ProductType } from "@/types/productType";

export const removeFromBasket = async (
  id: string,
  productsInBasket: ProductType[],
  setProductsInBasket: React.Dispatch<React.SetStateAction<ProductType[]>>
) => {
  try {
    setProductsInBasket(
      productsInBasket.filter((product) => {
        return product._id !== id;
      })
    );
  } catch (error) {
    console.error("error in delete from basket", error);
  }
};
