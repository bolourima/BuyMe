import { BrandIcon } from "@/SVG/BrandIcon";
import { EmailIcon } from "@/SVG/EmailIcon";
import { FaceIcon } from "@/SVG/FaceIcon";
import { InstIcon } from "@/SVG/InstIcon";
import { LinkitIcon } from "@/SVG/LinkitIcon";
import { TwiterIcon } from "@/SVG/TwiterIcon";
import { YoutubeIcon } from "@/SVG/YoutubeIcon";

import React from "react";

export const Footer = () => {
  return (
    <div className=" lg:w-full bg-gray-100 flex flex-col  items-center  ">
      <div className=" lg:flex flex-col items-center bg-gray-100 py-10 gap-10 w-9/12">
        <div className=" flex flex-col items-center gap-2">
          <h1 className=" text-3xl font-semibold">
            Subscribe on our newsletter
          </h1>
          <p className=" text-gray-500">
            Get daily news on upcoming offers from many suppliers all over the
            world
          </p>
        </div>

        <div className=" flex gap-2 w-full justify-center ">
          <div className="flex items-center gap-2 p-2 border rounded bg-white w-3/12">
            <EmailIcon />
            <input
              type="Email"
              className="grow px-2 bg-white "
              placeholder="Email "
            />
          </div>
          <button className="bg-cyan-500 rounded p-3 text-white ">
            Subscribe
          </button>
        </div>
      </div>

      <div className=" hidden lg:block lg:flex w-full bg-white flex-col items-center">
        <div className="flex gap-2 w-10/12  py-10 place-content-between ">
          <div className="w-1/6 flex flex-col gap-4">
            <div>
              <BrandIcon />
            </div>
            <div>
              <h1 className="">
                Best information about the company gies here but now lorem ipsum
                is
              </h1>
            </div>
            <div className="flex gap-3">
              <FaceIcon />
              <TwiterIcon />
              <LinkitIcon />
              <InstIcon />
              <YoutubeIcon />
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <h1 className=" font-semibold">About</h1>
            <div>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                About Us
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Find store
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Categories
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Blogs
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" font-semibold">Partnership</h1>
            <div>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                About Us
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Find store
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Categories
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Blogs
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" font-semibold">Information</h1>
            <div>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Help Center
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Money Refund
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Shipping
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Contact us
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" font-semibold">For users</h1>
            <div>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Login
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                Register
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                CSettings
              </h1>
              <h1 className=" text-gray-400 hover:text-cyan-400 hover:scale-105 duration-200 ease-out	cursor-pointer ">
                My Orders
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-3">
            <h1 className=" font-semibold"> Get app</h1>
            <div className=" flex flex-col gap-2">
              <div className="bg-black rounded p-2">
                <img src="./Img/Appstore.png" alt="appstore" />
              </div>
              <div className="bg-black rounded p-2">
                <img src="./img/Playstore.png" alt="playstore" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex place-content-between gap-2 w-10/12 py-12">
        <h1>© 2023 Ecommerce. </h1>

        <select className="select select-info px-2 max-w-xs w-48  bg-gray-100">
          <option disabled selected>
            Select language
          </option>
          <option>English</option>
          <option>Ital</option>
          <option>Mongolia </option>
          <option>Modern tech </option>
        </select>
      </div>
    </div>
  );
};
