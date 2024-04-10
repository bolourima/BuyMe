import { SearchInputContext } from "@/context/searchContext";
import { SearchProduct } from "@/utilities/searchProduct";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

export const MobileHero = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const { searchedProduct, setSearchedProduct } =
    useContext(SearchInputContext);
  const clickSearch = () => {
    router.push("/productlist");
    SearchProduct(searchInput, setSearchedProduct);
  };
  return (
    <div className="lg:hidden block">
      <div className="flex justify-center items-center w-full gap-2 px-4 my-5">
        <input
          type="text"
          placeholder="Хайх"
          className="border p-2 rounded w-5/6"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="w-1/6 flex justify-center items-center"
          onClick={clickSearch}
        >
          <SearchIcon />
        </button>
      </div>
      <div
        className="h-[250px] bg-center rounded-md mx-3"
        style={{
          backgroundImage: `url(https://img.freepik.com/premium-photo/fashion-model-outdoor-portrait-tourist-woman-enjoying-sightseeing-lviv-girl-looking-ancient-atchitecture_106029-855.jpg`,
        }}
      >
        <div className="w-full pt-16 pl-5">
          <p className="text-white font-sans text-xl mb-3 font-semibold">
            Wanna see all products
          </p>
          <a href="/productlist">
            <button className="bg-gray-700 text-white h-9 rounded-lg px-3 text-center text-sm font-semibold hover:bg-gray-400 hover:font-bold hover:text-black ">
              Shop now
            </button>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="flex justify-center font-sans text-xl font-semibold mt-9 mb-4">
          Category
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="bg-center bg-cover h-[120px] w-[170px] rounded-md pt-7 pl-2"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/3002552/pexels-photo-3002552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
            }}
          >
            <p className="text-white font-sans font-semibold mb-1 pl-1">
              Clothing
            </p>
            <button
              onClick={() => router.push("/productlist/clothing")}
              className="bg-gray-800 font-semibold text-white h-7 rounded-lg px-2 text-center text-xs hover:bg-gray-400 hover:font-bold hover:text-black "
            >
              Shop now
            </button>
          </div>
          <div
            className="bg-center bg-cover h-[120px] w-[170px] rounded-md pt-7 pl-2"
            onClick={() => router.push("/productlist/books")}
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            }}
          >
            <p className="text-white font-sans font-semibold mb-1 pl-1">
              Books
            </p>
            <button className="bg-gray-800 font-semibold text-white h-7 rounded-lg px-3 text-center text-xs hover:bg-gray-400 hover:font-bold hover:text-black ">
              Shop now
            </button>
          </div>
          <div
            className="bg-center bg-cover h-[120px] w-[170px] rounded-md pt-7 pl-2"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/17518760/pexels-photo-17518760/free-photo-of-close-up-of-an-iphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
            }}
          >
            <p className="text-white font-sans font-semibold mb-1 pl-1">
              Electronics
            </p>
            <button
              onClick={() => router.push("/productlist/electronics")}
              className="bg-gray-800 font-semibold text-white h-7 rounded-lg px-3 text-center text-xs hover:bg-gray-400 hover:font-bold hover:text-black "
            >
              Shop now
            </button>
          </div>
          <div
            className="bg-center bg-cover h-[120px] w-[170px] rounded-md pt-7 pl-2"
            style={{
              backgroundImage: `url(https://i.pinimg.com/564x/73/29/e3/7329e35e2e4cc27b4abe773019a23ae4.jpg)`,
            }}
          >
            <p className="text-white font-sans font-semibold mb-1 pl-1">
              Foods
            </p>
            <button
              onClick={() => router.push("/productlist/foods")}
              className="bg-gray-800 font-semibold text-white h-7 rounded-lg px-3 text-center text-xs hover:bg-gray-400 hover:font-bold hover:text-black "
            >
              Shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
