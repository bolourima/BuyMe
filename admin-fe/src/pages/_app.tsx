import { LeftBar } from "@/components/LeftBar";
import { NavBar } from "@/components/NavBar";
import { Token } from "@/contexts/TokenContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [IsVisibleSlidebar, setIsVisibleSlidebar] = useState(true);
  useEffect(() => {
    if (router.asPath === "/signin" || router.asPath === "/signup") {
      setIsVisibleSlidebar(false);
    } else setIsVisibleSlidebar(true);
  }, [router.asPath]);
  return (
    <Token>
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
      {IsVisibleSlidebar && <NavBar />}
      <div className="flex">
        {IsVisibleSlidebar && <LeftBar />}
        <div className=" w-full">
          <Component {...pageProps} />
        </div>
      </div>
    </Token>
  );
}
