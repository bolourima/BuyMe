import { instance } from "@/instance";
import { toastifyError, toastifySuccess } from "./toastify";

export const editUser = async (
  values: {
    name: string;
    phoneNumber: number;
    email: string;
  },
  avatarImg: string,
  token: string,
  setEdit: (type: boolean) => void
) => {
  try {
    const user = { ...values, avatarImg: avatarImg };
    const res = await instance.put("/editUser", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEdit(false);
    if (res.status == 200) return toastifySuccess("Successfully edited");
  } catch (error) {
    console.error("error in edit user", error);
    setEdit(false);
    return toastifyError("Failed to edit");
  }
};
