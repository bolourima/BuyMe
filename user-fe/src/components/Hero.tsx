import React from "react";

export const Hero = () => {
  return (
    <div className=" w-full flex justify-center">
      <div className=" w-10/12">
        <div className=" w-full flex rounded-lg">
          <div className=" w-6/12 h-[1080px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className=" w-6/12 ">
            <div className=" h-2/4  bg-gradient-to-t from-lime-400 to-teal-300 "></div>
            <div className=" h-2/4 bg-gradient-to-br from-red-600 to-sky-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
