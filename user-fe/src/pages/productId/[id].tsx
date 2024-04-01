import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { idType } from "@/types/idType";
import { ProductInitial } from "@/types/productInitial";
import { LoveIcon } from "@/icon/LoveIcon";

export default function ProductId() {
  const router = useRouter();
  const ID = router.query.id;
  const [productData, setProductData] = useState<ProductType>(ProductInitial);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const getProduct = async (ID: idType) => {
    if (!ID) {
      return;
    }
    const productRes = await instance.post(`/getProducts/${ID}`);
    const productData = productRes.data;
    setSelectedImg(productData.images[0]);
    setProductData(productData);
  };
  useEffect(() => {
    if (!ID) return;
    getProduct(ID);
  }, [ID]);
  console.log(selectedImg);
  return (
    <div className="w-full flex flex-col justify-center mt-24">
      <div className="flex gap-4 px-[100px]">
        <div className="w-1/2 flex flex-col items-center">
          <img src={selectedImg} className="h-[400px] shadow-xl rounded-md" />
          <div className="flex gap-8 mt-3 justify-center">
            {productData?.images.map((img) => {
              return (
                <img
                  onClick={() => setSelectedImg(img)}
                  src={img}
                  className="h-16 shadow-xl rounded-md"
                />
              );
            })}
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <p className="text-2xl font-semibold">{productData?.name}</p>
          <p className="text-green-600">
            {productData?.price.toLocaleString()}₮
          </p>
          <p className="w-[500px]">{productData?.description}</p>
          <div className="flex gap-3 w-[500px] justify-between">
            <div className="flex h-8 border-slate-500 border-[1px] justify-center rounded-md gap-5 items-center px-5">
              <button className="text-base flex text-center">-</button>
              <p className="text-lg">1</p>
              <button className="text-base flex text-center">+</button>
            </div>
            <button className="bg-black text-white h-8 rounded-lg px-4 text-center text-sm w-[270px]">
              ADD TO CART
            </button>
            <div className=" p-2 rounded-lg bg-black w-14 flex justify-center items-center h-8">
              <LoveIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// export const getServerSideProps = async () => {
//   const productRes = await instance.post(`/getProducts/${id}`);
//   const productData = productRes.data;
//   return {
//     props: { productData },
//   };
// };
