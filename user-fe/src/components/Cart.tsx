import React from "react";
import LeftArrowIcon from "@/icon/LeftArrowIcon";
import { AExpressIcon } from "@/icon/AExpressIcon";
import { MasterCardIcon } from "@/icon/MasterCardIcon";
import { PayPallIcon } from "@/icon/PayPallIcon";
import { VisaIcon } from "@/icon/VisaIcon";
import { ApplePayIcon } from "@/icon/ApplePayIcon";

export const Cart = () => {
  return (
    <div className="w-full flex flex-col items-center pt-16 min-h-screen">
      <div className="flex gap-6">
        <div className="flex flex-col bg-white w-[800px] border-[#DEE2E7] border-[1px] rounded-md  p-5 ">
          <div className="flex justify-between w-full py-5 border-b-2">
            <div className="flex gap-2">
              <div className="flex w-20 h-20 bg-[#F7F7F7] rounded-md justify-center items-center">
                <img
                  className="flex  w-[53px] h-[60px]"
                  src="./ShirtPic.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[#1C1C1C]">
                    T-shirts with multiple colors, for men and lady
                  </p>
                </div>
                <div className="text-[#8B96A5]">
                  <p>Size: medium, Color: blue, Material: Plastic Market</p>
                  <p>Seller: Artel Market</p>
                </div>
                <div className="flex gap-2.5 text-[13px]">
                  <button className="flex w-[70px] h-[30px] px-[10px] text-black border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Remove
                  </button>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end text-lg">
                <p>78,990,000</p>
              </div>
              <div className="flex w-[123px] h-10 border-black border-[1px] justify-center rounded-md gap-5 items-center p-1">
                <button className="text-2xl">-</button>
                <p className="text-lg">1</p>
                <button className="text-2xl">+</button>
              </div>
            </div>
          </div>

          <div className="flex pt-5">
            <div className="flex items-center justify-end w-full">
              <button className="flex w-[115px] h-[40px] px-[16px] text-white bg-black border-[1px] rounded-md justify-center items-center">
                Remove all
              </button>
            </div>
          </div>
        </div>
        <div className="w-[400px]">
          <div className="flex flex-col border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-white">
            <div className="flex justify-between border-b-[1px] pb-4">
              <div className="text-[#505050]">
                <p>Subtotal:</p>
                <p>Discount:</p>
                <p>Tax:</p>
              </div>
              <div>
                <p>$1403.97</p>
                <p className="text-[#FA3434]">- $60.00</p>
                <p className="text-[#00B517]">+ $14.96</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-[#1C1C1C]">
                <p>Total:</p>
              </div>
              <div className="text-[20px]">
                <p>$1357.97</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-black text-white w-full h-[54px] rounded-lg">
                Checkout
              </button>
            </div>
            <div className="flex justify-around mt-5">
              <AExpressIcon />
              <MasterCardIcon />
              <PayPallIcon />
              <VisaIcon />
              <ApplePayIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
