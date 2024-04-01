import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";

export const removeFromBasket = async (
  id: string,
  productsInBasket: ProductTypeWithQuantity[],
  setProductsInBasket: React.Dispatch<
    React.SetStateAction<ProductTypeWithQuantity[]>
  >,
  token: string
) => {
  console.log(id);
  try {
    const newBasket = productsInBasket.filter((product) => {
      return product.product._id !== id;
    });
    setProductsInBasket(newBasket);
    const res = await instance.delete(`/deleteProductFromBasket/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("error in delete from basket", error);
  }
};
