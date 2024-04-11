import { TokenContext } from "@/context/TokenContext";
import { ShopIcon } from "@/icon/ShopIcon";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useContext } from "react";
type Params = {
  shop: string;
};
type Props = {
  productData: ProductType[];
};
const Shop = ({
  productData,
  shopInfo,
}: {
  productData: ProductType[];
  shopInfo: {
    email: string;
    categories: { name: string }[];
    description: string;
  };
}) => {
  const { token, setToken } = useContext(TokenContext);
  return (
    <div className="w-full min-h-screen justify-center items-center flex flex-col gap-8">
      <div className="w-10/12 flex flex-col gap-6 lg:gap-16 justify-between">
        <div className="text-lg lg:text-3xl font-semibold text-black flex gap-4 justify-center items-center">
          <div className="lg:w-16 lg:h-16 h-6 w-6">
            <ShopIcon />
          </div>
          <p className="font-sans">{productData[0].shopId.shopName}</p>
        </div>
        <div className="lg:ml-16 flex flex-col">
          <p className="font-semibold lg:text-lg font-sans">About our shop:</p>
          <p className="">{shopInfo.description}</p>
        </div>
      </div>
      <div>
        <p className="font-sans font-semibold">See our products below</p>
      </div>
      <div className="grid w-10/12 grid-cols-1 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {productData.map((product) => {
          return (
            <div
              key={product._id}
              className="bg-white p-4 rounded-md shadow-lg transition duration-300 hover:shadow-lg flex flex-col justify-between items-center"
            >
              <div className="flex flex-col">
                <Link
                  as={`/productdetail/${product?._id}`}
                  href={`/productdetail/${product?._id}`}
                >
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-[190px] rounded-md"
                    />
                  </div>
                </Link>
                <h3 className="font-sans font-semibold h-12 flex items-center">
                  {product.name}
                </h3>
              </div>
              <div className="flex justify-between w-full mt-2 items-center">
                <p className="text-gray-700 text-xl font-semibold">
                  {product.price.toLocaleString()}₮
                </p>
                <button
                  onClick={() => {
                    putIntoBasket(product, token);
                  }}
                  className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Shop;
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  params
) => {
  const shopId = params.query.shopname;
  const productRes = await instance.get(`/shop/${shopId}`);
  const productData = productRes.data.products;
  const shopInfo = productRes.data.adminInfo;
  return {
    props: { productData, shopInfo },
  };
};
