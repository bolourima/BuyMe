import React from "react";
import { Icon1 } from "@/svg/Icon1";
import { Icon2 } from "@/svg/Icon2";
import { Icon3 } from "@/svg/Icon3";
import { Icon4 } from "@/svg/Icon4";
import { Icon5 } from "@/svg/Icon5";

export const LeftBar = ({
  setVisibleComponent,
}: {
  setVisibleComponent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center hover:bg-[#F7F7F8] ">
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon1 />
        </div>
        <div>
          <p>Хяналтын самбар</p>
        </div>
      </div>

      <button
        onClick={() => setVisibleComponent("order")}
        className="flex items-center hover:bg-[#F7F7F8]"
      >
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon2 />
        </div>
        <div>
          <p>Захилга</p>
        </div>
      </button>

      <div className="flex items-center hover:bg-[#F7F7F8]">
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon3 />
        </div>
        <div>
          <p>Орлого</p>
        </div>
      </div>

      <button
        onClick={() => setVisibleComponent("product")}
        className="flex items-center hover:bg-[#F7F7F8]"
      >
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon4 />
        </div>
        <div>
          <p>Бүтээгдэхүүн</p>
        </div>
      </button>

      <div className="flex items-center hover:bg-[#F7F7F8]">
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon5 />
        </div>
        <div>
          <p>Тохиргоо</p>
        </div>
      </div>
    </div>
  );
};
