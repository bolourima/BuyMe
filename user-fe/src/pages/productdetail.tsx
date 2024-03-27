import { PDPart2 } from "../components/ProductDetail/PDPart2";
import { PDPart3 } from "../components/ProductDetail/PDPart3";
import React from "react";

export default function ProductDetail() {
  return (
    <div className="w-full lg:w-full flex flex-col items-center py-4">
      {/* <PDPart1 /> */}
      <div className="flex">
        <PDPart2 />
        <PDPart3 />
      </div>
    </div>
  );
}
