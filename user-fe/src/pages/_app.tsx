import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { BasketBarVisiblity } from "@/context/BasketVisiblity";
import { ProductsInBasket } from "@/context/FoodsInBasket";
import { Footer2 } from "@/components/Footer copy";
import { Header2 } from "@/components/Header copy";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductsInBasket>
      <BasketBarVisiblity>
        <Header2 />
        <Component {...pageProps} />
        <Footer2 />
      </BasketBarVisiblity>
    </ProductsInBasket>
  );
}
