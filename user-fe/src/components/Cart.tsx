import React from "react";
import LeftArrowIcon from "@/icon/LeftArrowIcon";
import { AExpressIcon } from "@/icon/AExpressIcon";
import { MasterCardIcon } from "@/icon/MasterCardIcon";
import { PayPallIcon } from "@/icon/PayPallIcon";
import { VisaIcon } from "@/icon/VisaIcon";
import { ApplePayIcon } from "@/icon/ApplePayIcon";

export const Cart = () => {
  return (
    <>
      <div className="flex bg-[#F7FAFC] gap-6">
        <div className="flex flex-col bg-white w-[880px] border-[#DEE2E7] border-[1px] rounded-md  p-5">
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
                  <button className="flex w-[70px] h-[30px] px-[10px] text-[#FA3434] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Remove
                  </button>
                  <button className="flex w-[103px] h-[30px] px-[10px] text-[#0D6EFD] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Save for later
                  </button>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end">
                <p>$78.99</p>
              </div>
              <div className="flex w-[123px] h-10 bg-white rounded-lg border-[#DEE2E7] border-[1px] gap-2 items-center p-1">
                <select className="w-[110px]">
                  <option value="">Qty: 1</option>
                  <option value="">Qty: 2</option>
                  <option value="">Qty: 3</option>
                  <option value="">Qty: 4</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full py-5 border-b-2">
            <div className="flex gap-2">
              <div className="flex w-20 h-20 bg-[#F7F7F7] rounded-md justify-center items-center">
                <img
                  className="flex  w-[53px] h-[60px]"
                  src="./ShirtPic1.png"
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
                  <button className="flex w-[70px] h-[30px] px-[10px] text-[#FA3434] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Remove
                  </button>
                  <button className="flex w-[103px] h-[30px] px-[10px] text-[#0D6EFD] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Save for later
                  </button>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end">
                <p>$38.99</p>
              </div>
              <div className="flex w-[123px] h-10 bg-white rounded-lg border-[#DEE2E7] border-[1px] gap-2 items-center p-1">
                <select className="w-[110px]">
                  <option value="">Qty: 1</option>
                  <option value="">Qty: 2</option>
                  <option value="">Qty: 3</option>
                  <option value="">Qty: 4</option>
                </select>
              </div>
            </div>
          </div>
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
                  <button className="flex w-[70px] h-[30px] px-[10px] text-[#FA3434] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Remove
                  </button>
                  <button className="flex w-[103px] h-[30px] px-[10px] text-[#0D6EFD] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                    Save for later
                  </button>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end">
                <p>$170.99</p>
              </div>
              <div className="flex w-[123px] h-10 bg-white rounded-lg border-[#DEE2E7] border-[1px] gap-2 items-center p-1">
                <select className="w-[110px]">
                  <option value="">Qty: 1</option>
                  <option value="">Qty: 2</option>
                  <option value="">Qty: 3</option>
                  <option value="">Qty: 4</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex pt-5">
            <div className="flex items-center justify-between w-full">
              <button className="flex w-[159px] h-10 bg-[#127FFF] text-white rounded-lg items-center justify-center gap-3">
                <LeftArrowIcon />
                <span>Back to shop</span>
              </button>
              <button className="flex w-[115px] h-[40px] px-[16px] text-[#0D6EFD] border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                Remove all
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-[280px] h-[110px] border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-white">
            <div>
              <p className="text-[#505050]">Have a coupon?</p>
            </div>
            <div className="flex">
              <div className="flex w-[164px] h-10 border-[#E0E0E0] border-[1px] rounded-l-md justify-center items-center">
                <p className="text-[#8B96A5]">Add coupon</p>
              </div>
              <div>
                <button className="text-[#0D6EFD] w-[85px] h-10 border-[#E0E0E0] border-[1px] rounded-r-md">
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[280px]  border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-white">
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
              <button className="bg-[#00B517] text-white w-[248px] h-[54px] rounded-lg">
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
    </>
  );
};
