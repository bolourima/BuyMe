import React from "react";
import { NavBar } from "@/components/NavBar";
import { LeftBar } from "@/components/LeftBar";
import { IconCategory } from "@/svg/IconCategory";
import { IconDollar } from "@/svg/IconDollar";
import { IconMonthly } from "@/svg/IconMonthly";
import { IconSearch } from "@/svg/IconSearch";

export default function Product() {
  return (
    <>
      <div className="flex flex-col">
        <NavBar />
        <div className="flex">
          <div className="w-[222px]">
            <LeftBar />
          </div>
          <div className="bg-[#ECEDF0] w-full">
            <div className="flex gap-5 h-12 items-center p-4">
              <div>
                <a
                  className="font-normal hover:font-bold hover:underline hover:decoration-slice decoration-inherit"
                  href=""
                >
                  Бүтээгдэхүүн
                </a>
              </div>
              <div>
                <a
                  className="font-normal hover:font-bold hover:underline hover:decoration-slice decoration-inherit"
                  href=""
                >
                  Ангилал
                </a>
              </div>
            </div>
            <div className="flex flex-col p-6 gap-6">
              <div className="flex items-center">
                <button className="flex w-[280px] h-12 bg-black text-white rounded-lg items-center justify-center gap-3">
                  <span className="text-2xl">+</span>
                  <span>Бүтээгдэхүүн нэмэх</span>
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex h-10 justify-between">
                  <div className="flex gap-[13px]">
                    <div className="flex w-[145px]  bg-white rounded-lg gap-2 items-center p-1">
                      <IconCategory />
                      <select className="w-[100px]">
                        <option value="">Ангилал</option>
                        <option value="">Хувцас</option>
                        <option value="">Цахилгаан бараа</option>
                      </select>
                    </div>
                    <div className="flex w-[113px] h-10 bg-white rounded-lg gap-2 items-center p-1">
                      <IconDollar />
                      <select className="w-[70px]">
                        <option value="">Үнэ</option>
                        <option value="">10,000-50,000</option>
                        <option value="">51,000-100,000</option>
                        <option value="">101,000-150,000</option>
                      </select>
                    </div>
                    <div className="flex w-[145px] h-10 bg-white rounded-lg gap-2 items-center p-1">
                      <IconMonthly />
                      <select className="w-[100px]">
                        <option value="">Сараар</option>
                        <option value="">1 сараар</option>
                        <option value="">2 сараар</option>
                        <option value="">3 сараар</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center bg-white w-[419px] p-2 rounded-lg">
                    <IconSearch />
                    <input
                      className="w-full"
                      type="search"
                      placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
                    />
                  </div>
                </div>
                <div className="flex flex-col bg-white p-4 mt-4 rounded-lg">
                  <div className="flex border-b-[1px]">
                    <div className="w-[68px]"></div>
                    <div className="w-[156.8px]">
                      <p>Бүтээгдэхүүн</p>
                    </div>
                    <div className="w-[214px]">
                      <p>Ангилал</p>
                    </div>
                    <div className="w-[156.8px]">
                      <p>Үнэ</p>
                    </div>
                    <div className="w-[156.8px]">
                      <p>Үлдэгдэл</p>
                    </div>
                    <div className="w-[156.8px]">Зарагдсан</div>
                    <div className="w-[156.8px]">Нэмэгдсэн огноо</div>
                    <div className="w-[104px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
