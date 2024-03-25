import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { BasketBarVisiblity } from "@/context/BasketVisiblity";
import { ProductsInBasket } from "@/context/FoodsInBasket";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductsInBasket>
      <BasketBarVisiblity>
        <Component {...pageProps} />
      </BasketBarVisiblity>
    </ProductsInBasket>
  );
}
