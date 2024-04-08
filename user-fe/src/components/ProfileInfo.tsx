import { UserType } from "@/types/userType";
import React from "react";

export const ProfileInfo = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full h-fit flex flex-col gap-5 lg:flex">
      <div className="flex flex-col gap-3">
        <label className="text-xs">First Name</label>
        <p className="input bg-transparent border-gray-300 border-[1px] rounded-md lg:w-[300px] h-[30px] flex items-center pl-5">
          {user.name}
        </p>
      </div>
      <div className="flex flex-col w-full lg:flex gap-5 ">
        <div className="flex flex-col gap-3">
          <label className="text-xs">Phone Number</label>
          <p className="input bg-transparent border-gray-300 border-[1px] rounded-md lg:w-[300px] h-[30px] flex items-center pl-5">
            {user.phoneNumber}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xs">Email Address</label>
          <p className="input bg-transparent border-gray-300 border-[1px] rounded-md lg:w-[300px] h-[30px] flex items-center pl-5">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};
