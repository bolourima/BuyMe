import { ShopIcon } from "@/icon/ShopIcon";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { GetServerSideProps } from "next";
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
  shopInfo: { email: string; categories: { name: string }[] };
}) => {
  console.log(productData[0]);
  return (
    <div className="w-full min-h-screen justify-center items-center flex flex-col gap-8">
      <div className="w-10/12 flex gap-16 justify-between">
        <div className="text-3xl font-semibold text-black flex gap-4 justify-center items-center">
          <div className="w-16 h-16">
            <ShopIcon />
          </div>
          <p>{productData[0].shopId.shopName}</p>
        </div>
        <div className="flex flex-col text-xl font-semibold gap-4">
          <p>
            Email: {"  "}
            {shopInfo.email}
          </p>
          <div className="flex gap-4">
            Categories:
            {shopInfo.categories.map((category) => {
              return <p>{category.name}</p>;
            })}
          </div>
        </div>
      </div>
      <div className="grid w-10/12 grid-cols-1 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 gap-16">
        {productData.map((product) => {
          console.log(product.price);
          return (
            <div
              key={product._id}
              className="bg-white p-4 rounded-md shadow-md transition duration-300 hover:shadow-lg flex flex-col justify-between items-center"
            >
              <div className="flex flex-col">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.description}</p>
              </div>
              <div className="flex justify-between w-full mt-2 items-center">
                <p className="text-gray-700 text-xl font-semibold">
                  {product.price.toLocaleString()}₮
                </p>
                <button className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-700">
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
