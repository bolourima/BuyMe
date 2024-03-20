import React from "react";

export const ProductCardOne = ({
  img,
  price,
  title,
}: {
  img: string;
  price: string | number;
  title: string;
}) => {
  return (
    <div className=" p-4 border border-gray-300 rounded w-56 drop-shadow hover:scale-105 duration-200 ease-out	cursor-pointer">
      <div className=" p-6">
        <img src={img} alt="t-shirt" />
      </div>
      <div className=" w-full">
        <h1>{price}</h1>
        <p>{title}</p>
      </div>
    </div>
  );
};
