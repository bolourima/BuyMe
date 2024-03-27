import React from "react";

export const Hero = () => {
  return (
    <div className=" w-full flex justify-center">
      <div className=" w-full flex rounded-lg">
        <div
          className=" w-6/12 h-[1080px] hero "
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3002552/pexels-photo-3002552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
          }}
        >
          <span className=" text-6xl text-white font-extrabold">Clothing</span>
        </div>
        <div className=" w-6/12  ">
          <div
            className=" h-2/4 bg-center bg-cover hero   "
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/17518760/pexels-photo-17518760/free-photo-of-close-up-of-an-iphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
            }}
          >
            <span className=" text-6xl text-white font-extrabold">
              Electronics
            </span>
          </div>
          <div
            className=" h-2/4 bg-center bg-cover hero "
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
          >
            <span className=" text-6xl text-white font-extrabold">Books</span>
          </div>
        </div>
      </div>
    </div>
  );
};
