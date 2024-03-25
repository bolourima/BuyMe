import Product from "../components/Product";
import { instance } from "../instance";
import { ProductType } from "../types/productType";

import React from "react";

export default function Home({ productData }: { productData: ProductType[] }) {
  return (
    <div>
      <Product productData={productData} />
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const productRes = await instance.get("/getProducts");
//   const productData = productRes.data;
//   return {
//     props: { productData },
//   };
// };
