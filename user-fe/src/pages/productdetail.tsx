import Image from "next/image";
import { Inter } from "next/font/google";
import { PDPart1 } from "../components/ProductDetail/PDPart1";
import { PDPart2 } from "../components/ProductDetail/PDPart2";
import { PDPart3 } from "../components/ProductDetail/PDPart3";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ProductDetail() {
  return (
    <div className="w-full lg:w-full flex flex-col items-center py-4">
      <PDPart1 />
      <div className="flex">
        <PDPart1 />
        <PDPart3 />
      </div>
    </div>
  );
}
