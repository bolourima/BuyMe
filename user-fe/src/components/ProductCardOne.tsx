import React from "react";

export const ProductCardOne = ({ data }: any) => {
  const { img, price, name, brandName } = data;
  return (
    <div className=" p-4 border border-gray-300 rounded w-56 drop-shadow hover:scale-105 duration-200 ease-out	cursor-pointer">
      <div className=" p-6">
        <img src={img} alt="t-shirt" />
      </div>
      <div className=" w-full">
        <h1>{price}</h1>
        <p>
          {brandName}
          {name}
        </p>
      </div>
    </div>
  );
};
