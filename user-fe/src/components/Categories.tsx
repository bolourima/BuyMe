import React from "react";

export default function Categories() {
  return (
    <div className=" w-full flex justify-center">
      <div className=" w-10/12 flex flex-col gap-10">
        <h1 className=" text-4xl font-semibold">Shop by Categories</h1>

        <div className=" w-full flex place-content-between ">
          <div
            className="w-1/5 h-[500px] bg-center bg-cover rounded p-5 flex items-end justify-center hero"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/16477931/pexels-photo-16477931/free-photo-of-camera-iphone-tablet-and-airpods.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load)`,
            }}
          >
            <button className=" bg-black p-4 rounded-lg text-white ">
              Electronics
            </button>
          </div>

          <div
            className="w-1/5 bg-center bg-cover p-5 flex items-end justify-center hero rounded"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/3538028/pexels-photo-3538028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
          >
            <button className=" bg-black p-4 rounded-lg text-white">
              Clothing
            </button>
          </div>
          <div
            className="w-1/5 bg-center bg-cover rounded  p-5 flex items-end justify-center hero"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/7643400/pexels-photo-7643400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
          >
            <button className=" bg-black p-4 rounded-lg text-white">
              Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
