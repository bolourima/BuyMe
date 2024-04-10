import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { GetServerSideProps } from "next";
type Params = {
  shop: string;
};
type Props = {
  productData: ProductType[];
};
const Shop = ({ productData }: { productData: ProductType[] }) => {
  return (
    <div>
      {productData.map((product) => {
        return <div>{product.name}</div>;
      })}
    </div>
  );
};
export default Shop;
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  params
) => {
  const shopId = params.query.shopname;
  const productRes = await instance.get(`/shop/${shopId}`);
  const productData = productRes.data;
  return {
    props: { productData },
  };
};
