import React from "react";
import { LeftArrow } from "@/svg/LeftArrow";
import { IconPic } from "@/svg/IconPic";
import { LeftBar } from "./LeftBar";
import { NavBar } from "./NavBar";

export const AddProductBar = () => {
  return (
    <>
      <div>
        <NavBar />

        <div className="flex">
          <LeftBar />

          <div className="flex flex-col">
            <div className="flex items-center pl-5 h-12 gap-4">
              <div className="w-4 h-4">
                <LeftArrow />
              </div>
              <div>
                <p>Бүтээгдэхүүн нэмэх</p>
              </div>
            </div>
            <div className="flex flex-col bg-[#F7F7F8] p-6 gap-6">
              <div className="flex gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex  flex-col bg-white rounded-lg w-[563px] p-6 gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="">Бүтээгдэхүүний нэр</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Нэр"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="">Нэмэлт мэдээлэл</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="">Барааны код</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Н#12345678"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col bg-white w-[563px] rounded-lg p-6 gap-4">
                    <div>
                      <span>Бүтээгдэхүүний зураг</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                        <IconPic />
                      </div>
                      <div className="flex w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                        <IconPic />
                      </div>
                      <div className="flex w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                        <IconPic />
                      </div>
                      <div className="flex w-[125px] h-[125px] justify-center items-center ">
                        <button className="w-8 h-8 p-[4px] bg-[#F7F7F8] rounded-full items-center">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex bg-white rounded-lg w-[563px] p-6 gap-4">
                    <div className="flex flex-col w-1/2 gap-2">
                      <span className="">Үндсэн үнэ</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Үндсэн үнэ"
                      />
                    </div>

                    <div className="flex flex-col w-1/2 gap-2">
                      <span className="">Үлдэгдэл тоо ширхэг</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Үлдэгдэл тоо ширхэг"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex  flex-col  w-[575px] gap-6">
                  <div className="flex flex-col gap-4 bg-white rounded-lg p-6 ">
                    <div className="flex flex-col gap-2">
                      <span className="">Ерөнхий ангилал</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Сонгох"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="">Дэд ангилал</span>
                      <input
                        className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                        type="text"
                        placeholder="Сонгох"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
                    <p className="">Төрөл</p>
                    <div className="flex gap-6 items-center">
                      <span>Өнгө</span>
                      <button className="w-8 h-8 p-[4px] bg-[#F7F7F8] rounded-full items-center">
                        +
                      </button>
                    </div>
                    <div className="flex gap-6 items-center">
                      <span>Хэмжээ</span>
                      <button className="w-8 h-8 p-[4px] bg-[#F7F7F8] rounded-full items-center">
                        +
                      </button>
                    </div>
                    <button className=" border-[#F7F7F8] border-2 p-3 rounded-md text-sm">
                      Төрөл нэмэх
                    </button>
                  </div>
                  <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
                    <span className="">Таг</span>
                    <input
                      className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                      type="text"
                      placeholder="Таг нэмэх ..."
                    />
                    <span>Санал болгох: Гутал , Цүнх , Эмэгтэй </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 justify-end">
                <button className="flex w-[113px] h-[56px] border-[#D6D8DB] border-2 rounded-lg justify-center items-center">
                  Ноорог
                </button>
                <button className="flex w-[113px] h-[56px] bg-black text-white rounded-lg justify-center items-center">
                  Нийтлэх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
