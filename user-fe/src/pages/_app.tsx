import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="flex container gap-10"></div>
      <SignUp />
    </div>
  );
}
