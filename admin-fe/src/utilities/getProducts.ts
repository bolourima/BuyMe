import { instance } from "@/instance";
import { GetProductType } from "@/types/getProductType";

export const getProducts = async (
  token: string,
  setProduct: (data: GetProductType[]) => void
) => {
  try {
    const productRes = await instance.get("/getSelectedProducts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProduct(productRes.data);
  } catch (error) {
    console.error("error in get products", error);
  }
};
