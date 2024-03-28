import React from "react";
import { useRouter } from "next/router";
import { instance } from "@/instance";

export default function ProductId() {
  const router = useRouter();
  console.log(router);
  return <div>{router.query._id}</div>;
}
export const getServerSideProps = async () => {
  const productRes = await instance.get("/getProducts");
  const productData = productRes.data;
  return {
    props: { productData },
  };
};
