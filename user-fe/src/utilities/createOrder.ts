import { instance } from "@/instance";
import { ProductType } from "@/types/productType";

export const createOrder = async (products: ProductType[], token: string) => {
  try {
    const idContainer: string[] = [];
    products.map((product) => {
      return idContainer.push(product._id);
    });
    const res = await instance.post("/createOrder", idContainer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status == 201) return alert("Created");
    if (res.status == 403) return alert("User invalid");
    if (res.status == 400) return alert("Failed to create order");
  } catch (error) {
    console.error("error in creating order", error);
  }
};
