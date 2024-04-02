import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
type Order = {
  product: ProductType;
  selectedProductQuantity: number;
};

export const createOrder = async (
  products: ProductTypeWithQuantity[],
  token: string,
  total: number
) => {
  try {
    const selectedProductContainer: Order[] = [];
    for (let i = 0; i < products.length; i++) {
      selectedProductContainer.push({
        product: products[i].product,
        selectedProductQuantity: products[i].selectedProductQuantity,
      });
    }
    const res = await instance.post(
      "/createOrder",
      { products: selectedProductContainer, total: total },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.status == 201) return alert("Created");
    if (res.status == 403) return alert("User invalid");
    if (res.status == 400) return alert("Failed to create order");
  } catch (error) {
    console.error("error in creating order", error);
  }
};
