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
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col items-center justify-center lg:flex-col lg:w-1/2">
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
        <div className="flex flex-col items-center lg:flex-col lg:w-1/2 justify-center gap-5">
          <p className="text-2xl font-semibold">{productData?.name}</p>
          <p className="text-green-600">
            {productData?.price.toLocaleString()}₮
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setProductData(data);
              }}
              className="bg-black text-white h-8 rounded-lg px-4 text-center text-sm sm:w-[180px] lg:w-[270px]"
            >
              ADD TO CART
            </button>
            <div className=" p-2 rounded-lg bg-black w-14 flex justify-center items-center h-8">
              <LoveIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-10 text-wrap lg:w-[800px] mt-14">
        <div className="flex justify-center gap-5 h-12 p-3 font-semibold border-b-2">
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
