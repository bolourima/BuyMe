import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ProductsInBasket } from "@/context/FoodsInBasket";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ProductsInBasket>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Component {...pageProps} />
        <Footer />
      </ProductsInBasket>
    </div>
  );
}
