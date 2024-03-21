import React from "react";

export const Hero = () => {
  return (
    <div className="w-full lg:w-full flex justify-center py-4">
      <div className="flex gap-3">
        <div className="flex flex-col lg:w-[250px]">
          <button className="h-[40px]">Automobiles</button>
          <button className="h-[40px]">Clothes and wear</button>
          <button className="h-[40px]">Home interiors</button>
          <button className="h-[40px]">Computer and tech</button>
          <button className="h-[40px]">Tools, equipments</button>
          <button className="h-[40px]">Sports and outdoor</button>
          <button className="h-[40px]">Animal and pets</button>
          <button className="h-[40px]">Machinery tools</button>
          <button className="h-[40px]">More category</button>
        </div>
        <div className="w-[665px] relative">
          <img src="./img/head.png" alt="" className="h-[360px]" />
          <div className="absolute top-14 left-14">
            <p className="pl-1 ">Latest trending</p>
            <p className="text-3xl pl-[2px] pb-2">Electronic items</p>
            <button className="bg-white rounded-md h-10 w-[120px]">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[200px] gap-[9px]">
          <div className="flex flex-col bg-[#E3F0FF] h-[150px] p-2 rounded-md">
            <div className="flex mb-2">
              <img src="./img/Avatar.png" alt="" className="h-11" />
              <p className="text-base ml-2">Hi, user let’s get stated</p>
            </div>
            <button className="rounded-md h-[30px] w-[180px] bg-[#127FFF] text-white mb-2">
              Join now
            </button>
            <button className="rounded-md h-[30px] w-[180px] text-[#127FFF] bg-white">
              Log In
            </button>
          </div>
          <div className="bg-[#F38332] rounded-md h-[95px] text-wrap text-white text-base pt-6 pl-6">
            <p>Get US $10 off with a new supplier</p>
          </div>
          <div className="bg-[#55BDC3] rounded-md h-[95px] text-wrap text-base text-white pt-6 pl-6">
            <p>Send quotes with supplier preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};
