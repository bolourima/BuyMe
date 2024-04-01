import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ProductsInBasket } from "@/context/FoodsInBasket";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Router, useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className=" m-0">
      <ProductsInBasket>
        {router.asPath !== "/signin" && <Header />}

        <Component {...pageProps} />
        {router.asPath !== "/signin" && <Footer />}
      </ProductsInBasket>
    </div>
  );
}
