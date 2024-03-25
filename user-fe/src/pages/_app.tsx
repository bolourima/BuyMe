import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import SignUp from "../components/SignUp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
<<<<<<< HEAD
      <Header />

      <Component {...pageProps} />

      <Footer />
=======
      <div className="flex container gap-10"></div>
      <SignUp />
>>>>>>> main
    </div>
  );
}
