import { TokenContext } from "@/context/TokenContext";
import { getFavProducts } from "@/helper/getFavProducts";
import { removeFromFavs } from "@/helper/removeFromBasket";
import { ProductType } from "@/types/productType";
import { toastifyWarning } from "@/utilities/toastify";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const favorites = () => {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const [products, setProducts] = useState<ProductType[]>([]);
  const setFavs = (products: ProductType[]) => {
    setProducts(products);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toastifyWarning("Please signin");
      router.push("/signin");
      return;
    }
    setToken(accessToken);
    getFavProducts(accessToken, setFavs);
  }, []);
  return (
    <div>
      {products.map((product, i) => {
        return (
          <div
            key={i}
            className=" flex flex-col lg:flex lg:flex-row gap-2 w-full h-[300px] items-center px-4 my-4"
          >
            <img src={product?.images[0]} className="w-1/4 h-full" />
            <div className="lg:flex flex-col w-1/2 pl-4 h-full">
              <p>Name: {product?.name}</p>
              <p>Category: {product?.categoryId.name}</p>
              <p>SubCategory: {product?.subCategoryName}</p>
              <p>Brand: {product?.brandName}</p>
              <div>
                Price:
                {product?.disCount.isSale ? (
                  <p>
                    <p className="line-through">
                      {product?.price.toLocaleString()}
                    </p>
                    {(
                      product.price *
                      ((100 - product.disCount.salePercent) / 100)
                    ).toLocaleString()}
                    ₮
                  </p>
                ) : (
                  product?.price.toLocaleString()
                )}
              </div>
              <p>
                Discount:
                {product?.disCount.isSale
                  ? "   " + product?.disCount.salePercent + "%"
                  : "   Хямдралгүй"}
              </p>
              <p>Tags: {product?.tag}</p>
            </div>
            <button
              onClick={() => {
                removeFromFavs(token, product._id);
              }}
              className="w-full bg-black h-12 rounded-lg text-white flex justify-center items-center"
            >
              Delete from favorites
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default favorites;
