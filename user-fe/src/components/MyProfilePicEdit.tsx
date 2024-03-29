import React from "react";
import { EditIcon } from "../icon/EditIcon";

export const MyProfilePicEdit = () => {
  return (
    <div className="">
      <div className="relative">
        <img
          className="flex w-[70px] h-[70px] rounded-full "
          src="./IconPicture.jpeg"
          alt=""
        />
        <div className="absolute w-5 h-5 bottom-0 right-0">
          <EditIcon />
        </div>
      </div>
    </div>
  );
};
