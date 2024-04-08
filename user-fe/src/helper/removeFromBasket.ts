import { instance } from "@/instance";
import { toastifyError, toastifySuccess } from "@/utilities/toastify";

export const removeFromFavs = async (token: string, id: string) => {
  try {
    const res = await instance.delete(`/removeFromFavs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toastifySuccess("Removed from favs");
  } catch (error) {
    toastifyError("Failed to remove from favs");
  }
};
