import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <div className="w-full flex p-3  lg:w-full lg:flex lg:p-0 justify-center">
      <div className=" w-10/12 flex flex-col  gap-7 lg:w-full lg:flex lg:flex-row lg:gap-0 rounded-lg">
        <div
          className=" h-52 rounded md:h-[200px] bg-center bg-cover  lg:w-6/12 lg:h-[1080px] hero lg:rounded-none  "
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3002552/pexels-photo-3002552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
          }}
        >
          <Link
            href={"/productList/Clothing"}
            className=" Hero-text text-3xl lg:text-6xl text-white font-extrabold"
          >
            <span>Clothing</span>
          </Link>
        </div>

        <div className=" flex  lg:flex flex-col gap-7 lg:w-6/12 lg:gap-0  ">
          <div
            className=" rounded h-52 md:h-72 lg:h-2/4 lg:rounded-none bg-center bg-cover hero   "
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/17518760/pexels-photo-17518760/free-photo-of-close-up-of-an-iphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
            }}
          >
            <Link
              href={"/productList/Electronics"}
              className=" Hero-text text-3xl lg:text-6xl text-white font-extrabold"
            >
              <span>Electronics</span>
            </Link>
          </div>
          <div
            className=" rounded h-52 md:h-72 lg:h-2/4 bg-center lg:rounded-none bg-cover hero "
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
          >
            <Link
              href={"/productList/Books"}
              className=" Hero-text text-6xl text-white font-extrabold"
            >
              <span>Books</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
