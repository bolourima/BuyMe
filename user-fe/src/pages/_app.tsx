import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Cart } from "@/components/Cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* <Header />
      <Component {...pageProps} />
      <Footer /> */}
      <Cart />
    </div>
  );
}
