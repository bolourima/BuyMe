import { instance } from "@/instance";

export const uploadSingleImage = async (
  token: string,
  img: File,
  imageNumber: string,
  setImg: React.Dispatch<React.SetStateAction<string>>
) => {
  const formData = new FormData();
  formData.append("img", img);
  if (imageNumber === "One") {
    setImg("../waiting.png");
    const res = await instance.post("/selectImage", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setImg(res.data.img);
  }
  if (imageNumber === "Two") {
    setImg("../waiting.png");
    const res = await instance.post("/selectImage", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setImg(res.data.img);
  }
  if (imageNumber === "Three") {
    setImg("../waiting.png");
    const res = await instance.post("/selectImage", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setImg(res.data.img);
  }
};
