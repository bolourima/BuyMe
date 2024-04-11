import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useMemo, useState } from "react";
import { ProductsInBasket } from "@/context/ProductsInCartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { Router, useRouter } from "next/router";
import { Token } from "@/context/TokenContext";
import { SearchedProducts } from "@/context/searchContext";
import { ProductsInFav } from "@/context/ProductsInFavContext";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isVisibleHF, setIsVisibleHF] = useState(true);
  useEffect(() => {
    if (router.asPath === "/signin" || router.asPath === "/signup") {
      setIsVisibleHF(false);
    } else setIsVisibleHF(true);
  }, [router.asPath]);
  return (
    <div className=" m-0">
      <Token>
        <SearchedProducts>
          <ProductsInBasket>
            <ProductsInFav>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              {isVisibleHF && <Header />}
              <NextNProgress
                color="black"
                startPosition={10}
                stopDelayMs={300}
                height={6}
                showOnShallow={true}
              />
              <Component {...pageProps} />
              {isVisibleHF && <Footer />}
            </ProductsInFav>
          </ProductsInBasket>
        </SearchedProducts>
      </Token>
    </div>
  );
}
