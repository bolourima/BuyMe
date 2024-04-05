import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { idType } from "@/types/idType";
import { ProductInitial } from "@/types/productInitial";
import { LoveIcon } from "@/icon/LoveIcon";
import { ClickHandler } from "@/types/handlerType";
import { toastifyError } from "@/utilities/toastify";

export default function ProductId({
  data,
}: {
  data: ProductType;
  setProductData: ClickHandler;
}) {
  console.log("first");
  const router = useRouter();
  console.log("first2");
  const ID = router.query.id;
  console.log("first3");
  const [productData, setProductData] = useState<ProductType>(ProductInitial);
  console.log("first4");
  const [selectedImg, setSelectedImg] = useState<string>("");
  console.log("first5");
  const [onDescription, setOnDescription] = useState(true);
  console.log("first6");
  const [onReviews, setOnReviews] = useState(false);
  console.log("first7");
  const getProduct = async (ID: idType) => {
    if (!ID) {
      console.log("two");
      return;
    }
    try {
      const productRes = await instance.post(`/getProducts/${ID}`);
      console.log("three");
      const productData = productRes.data;
      console.log("productdata", productData);
      setSelectedImg(productData.images[0]);
      console.log("setselectedImg", setSelectedImg);
      setProductData(productData);
      console.log("setproductdata", setProductData);
    } catch (error) {
      console.log("errooor", error);
      toastifyError("id error");
    }
  };
  useEffect(() => {
    console.log("useeffect");

    if (!ID) return;
    console.log("useeffect");
    getProduct(ID);
    console.log("getproductID", getProduct(ID));
  }, [ID]);
  const ChangeBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = (event.target as HTMLButtonElement).innerText;
    console.log("changeBtn");
    setOnDescription(false);
    setOnReviews(false);

    if (buttonText === "Description") {
      setOnDescription(true);
    } else if (buttonText === "Reviews") {
      setOnReviews(true);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center mt-24 px-[100px]">
      <div className="flex gap-4 ">
        <div className="w-1/2 flex flex-col items-center">
          <img src={selectedImg} className="h-[400px] shadow-xl rounded-md" />
          <div className="flex gap-8 mt-3 justify-center">
            {productData?.images.map((img, i) => {
              return (
                <img
                  key={i}
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
          <div className="flex gap-3 w-[500px] ">
            {/* <div className="flex h-8 border-slate-500 border-[1px] justify-center rounded-md gap-5 items-center px-5">
              <button className="text-base flex text-center">-</button>
              <p className="text-lg">1</p>
              <button className="text-base flex text-center">+</button>
            </div> */}
            <button
              onClick={() => {
                setProductData(data);
              }}
              className="bg-black text-white h-8 rounded-lg px-4 text-center text-sm w-[270px]"
            >
              ADD TO CART
            </button>
            <div className=" p-2 rounded-lg bg-black w-14 flex justify-center items-center h-8">
              <LoveIcon />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full px-[100px] mt-14">
        <div className="flex gap-5 h-12 p-3 font-semibold border-b-2">
          <button onClick={ChangeBtn}>Description</button>
          <button onClick={ChangeBtn}>Reviews</button>
        </div>
        {onDescription && (
          <div className="mt-5">{productData?.description}</div>
        )}
        {onReviews && (
          <div className="mt-5">
            <div className="flex gap-7">
              <img
                src="/IconPicture.jpeg"
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <p>
                The phone works well on Canada's Rogers network. I've had no
                issues crossing the border into the US. The camera works for my
                purposes and the Moto gestures are a great feature. The hatchet
                move to turn the flashlight on is used often as well as the
                rotate to start the camera. The only reason I replace these
                phones is the battery, like all phones they tend to lose their
                staying power after 3 years. I see no reason to replace
                batteries in old phones.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// }
