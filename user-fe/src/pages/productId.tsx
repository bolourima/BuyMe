import React from "react";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  console.log(router);
  return <div>{router.query._id}</div>;
}
