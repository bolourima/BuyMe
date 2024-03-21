import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Cart } from "@/components/Cart";
import { SubCategory } from "@/components/SubCategory";
SubCategory;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="flex container gap-10">
        <SubCategory />
        <Component {...pageProps} />
      </div>

      <Footer />
    </div>
  );
}
