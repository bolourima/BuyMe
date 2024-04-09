import { instance } from "@/instance";
import { GetProductType } from "@/types/getProductType";
import { Dispatch, SetStateAction } from "react";

export const getProducts = async (
  token: string,
  setProduct: Dispatch<SetStateAction<GetProductType[]>>
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
