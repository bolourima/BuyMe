import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ProductsInBasket } from "@/context/FoodsInBasket";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ProductsInBasket>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ProductsInBasket>
    </div>
  );
}
