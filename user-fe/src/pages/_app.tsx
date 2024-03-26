import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ProductsInBasket } from "@/context/FoodsInBasket";
import { BasketBarVisiblity } from "@/context/BasketVisiblity";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ProductsInBasket>
        <BasketBarVisiblity>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </BasketBarVisiblity>
      </ProductsInBasket>
    </div>
  );
}
