import { UserType } from "@/types/userType";
import React from "react";

export const ProfileInfo = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full h-fit flex flex-col gap-8">
      <div className="w-fit flex flex-col px-5">
        <label className="text-xs">First Name</label>
        <p className="input bg-white border-black border-1[px] flex items-center pr-16">
          {user.name}
        </p>
      </div>
      <div className="w-full lg:flex gap-6 px-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs">Phone Number</label>
          <p className="input bg-white border-black border-1[px] flex items-center">
            {user.phoneNumber}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">Email Address</label>
          <p className="input bg-white border-black border-1[px] flex items-center">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};
