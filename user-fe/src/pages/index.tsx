import Product from "../components/Product";
import { instance } from "../instance";
import { ProductType } from "../types/productType";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ productData }: { productData: ProductType[] }) {
  console.log(productData);
  return (
    <div>
      {/* 
      <Hero /> */}
      {/* <RecommendedItems productData={productData} /> */}
      <Product productData={productData} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const productRes = await instance.get("/getProducts");
  const productData = productRes.data;
  return {
    props: { productData },
  };
};
