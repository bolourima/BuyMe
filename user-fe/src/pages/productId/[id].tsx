import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { idType } from "@/types/idType";

export default function ProductId() {
  const router = useRouter();
  const ID = router.query.id;
  const [productData, setProductData] = useState<ProductType | null>(null);
  const {
    _id,
    name,
    description,
    price,
    productCode,
    quantity,
    tag,
    disCount,
    categoryId,
    subCategoryName,
    brandName,
    images,
    createdAt,
    updatedAt,
    selectedQuantity,
  } = productData || {};

  const getProduct = async (ID: idType) => {
    if (!ID) {
      return;
    }
    const productRes = await instance.post(`/getProducts/${ID}`);
    const productData = productRes.data;
    setProductData(productData);
  };
  useEffect(() => {
    if (!ID) return;
    getProduct(ID);
  }, [ID]);

  return (
    <div>
      <div></div>
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
