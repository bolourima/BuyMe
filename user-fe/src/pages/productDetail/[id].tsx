import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { idType } from "@/types/idType";
import { ProductInitial } from "@/types/productInitial";
import { LoveIcon } from "@/icon/LoveIcon";
import { ClickHandler } from "@/types/handlerType";
import { toastifyError } from "@/utilities/toastify";
import { ShopIcon } from "@/icon/ShopIcon";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import { TokenContext } from "@/context/TokenContext";
import { ProductsInFavContext } from "@/context/ProductsInFavContext";
import { addToFavs } from "@/helper/addToFavs";
import { removeFromFavs } from "@/helper/removeFromBasket";
import { RedLoveIcon } from "@/icon/RedLoveIcon";

const ProductId = ({ data }: { data: ProductType }) => {
  const router = useRouter();
  const id = router.query.id;
  const [productData, setProductData] = useState<ProductType>(ProductInitial);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [onDescription, setOnDescription] = useState(true);
  const [onReviews, setOnReviews] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const { productsInFav, setProductsInFav } = useContext(ProductsInFavContext);

  const getProduct = async (productId: idType) => {
    try {
      const productRes = await instance.get(`/productDetail/${productId}`);
      setSelectedImg(productRes.data.images[0]);
      setProductData(productRes.data);
    } catch (error) {
      console.error("errooor", error);
      toastifyError("id error");
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);
  const ChangeBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = (event.target as HTMLButtonElement).innerText;
    setOnDescription(false);
    setOnReviews(false);

    if (buttonText === "Description") {
      setOnDescription(true);
    } else if (buttonText === "Reviews") {
      setOnReviews(true);
    }
  };
  const isFav = true;
  return (
    <>
      <NextSeo
        title={productData?.name}
        description={productData?.description}
        openGraph={{
          title: productData?.name,
          images: [
            {
              url: productData?.images[0],
              width: 800,
              height: 600,
              alt: "Product Image",
            },
          ],
          site_name: "Buy Me",
        }}
      />

      <div className="w-full flex flex-col justify-center items-center ">
        <div className="flex justify-center lg:mb-7">
          <Link
            className="flex gap-4 w-full cursor-pointer"
            as={`/shop/${productData.shopId._id}`}
            href={`/shop/[id]`}
          >
            <button className="w-8 h-8">
              <ShopIcon />
            </button>
            <p className="text-2xl font-semibold hover:text-green-600">
              {productData.shopId.shopName}
            </p>
          </Link>
        </div>

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
          <div className="flex flex-col lg:flex-col lg:w-1/2 gap-5 lg:ml-8">
            <p className="text-2xl font-semibold lg:mt-10">
              {productData?.name}
            </p>
            <p className="text-green-600">
              {productData?.price.toLocaleString()}₮
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  putIntoBasket(productData, token);
                }}
                className="bg-black text-white hover:bg-gray-400 hover:text-black hover:font-bold h-8 rounded-lg px-4 text-center text-sm sm:w-[180px] lg:w-[290px]"
              >
                ADD TO CART
              </button>
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
                  issues crossing the border into the US. The camera works for
                  my purposes and the Moto gestures are a great feature. The
                  hatchet move to turn the flashlight on is used often as well
                  as the rotate to start the camera. The only reason I replace
                  these phones is the battery, like all phones they tend to lose
                  their staying power after 3 years. I see no reason to replace
                  batteries in old phones.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductId;
