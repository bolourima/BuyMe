import React from "react";

export const RelatedProductCard = ({ data }: any) => {
  const { subCategoryName } = data;
  return (
    <div className=" flex flex-col w-40 gap-2 cursor-pointer ">
      <div className=" p-4 bg-gray-300 rounded w-fit">
        <img src="./Img/Wallet.png" alt="img" />
      </div>
      <h1>{subCategoryName}</h1>
      <h1 className=" text-[#8B96A5]">$32.00-$40.00</h1>
    </div>
  );
};
