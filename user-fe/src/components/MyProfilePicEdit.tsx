import React from "react";
import { EditIcon } from "../icon/EditIcon";
import { instance } from "@/instance";

export const MyProfilePicEdit = ({
  avatar,
  img,
  setImg,
  token,
}: {
  avatar: string;
  img: string;
  setImg: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}) => {
  const uploadSingleImage = async (file: File) => {
    setImg("./waiting.png");
    try {
      const formData = new FormData();
      formData.append("img", file);
      const res = await instance.post("/selectImage", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImg(res.data.img);
    } catch (error) {
      setImg(avatar);
      console.error("error in uploadsingleimg", error);
    }
  };
  return (
    <div className="">
      <label className="relative">
        <img
          className="flex w-[70px] h-[70px] rounded-full "
          src={img ? img : avatar}
          alt=""
        />
        <input
          type="file"
          multiple={false}
          hidden
          onChange={(e) => {
            if (!e.target.files) return;
            uploadSingleImage(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
};
