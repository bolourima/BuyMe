import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
type Order = {
  productId: string;
  count: number;
};

export const createOrder = async (
  products: ProductType[],
  token: string,
  total: number
) => {
  try {
    const res = await instance.post(
      "/createOrder",
      {
        products: products,
        total: total,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status == 201) return alert("Created");
    if (res.status == 403) return alert("User invalid");
    if (res.status == 400) return alert("Failed to create order");
  } catch (error) {
    console.error("error in creating order", error);
  }
};
