import DelletIcon from "@/SVG/DelletIcon";
import React from "react";

export const ProductFilterRecent = ({ data }: any) => {
  const { brandName } = data;
  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg border-cyan-500 bg-white w-fit">
      <h1>{brandName}</h1>
      <DelletIcon />
    </div>
  );
};
