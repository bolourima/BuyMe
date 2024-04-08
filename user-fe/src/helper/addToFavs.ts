import { instance } from "@/instance";
import { toastifyError, toastifySuccess } from "@/utilities/toastify";

export const addToFavs = async (_id: string, token: string) => {
  try {
    const res = await instance.post(
      "/favs",
      { productId: _id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status == 208) {
      return toastifySuccess("Removed from favs");
    }
    toastifySuccess("Added to favorites");
  } catch (error) {
    toastifyError("Failed to add to favorites");
  }
};
