import { DotSvg } from '@/icon/DotSvg';
import { HeartSvg } from '@/icon/HeartSvg';
import { ReviewSvg } from '@/icon/ReviewSvg';
import { SoldSvg } from '@/icon/SoldSvg';
import { StarSvg } from '@/icon/StarSvg';
import React from 'react'

export const PDPart1 = () => {
  return (
    <div>
      <div className="w-full lg:w-full flex flex-col items-center py-4">
        <div className="flex gap-10">
          <div>
            <img
              src="./img/bigproduct.png"
              alt=""
              className="w-[380px] h-[380px] mb-3 "
            />
            <div className="flex gap-2 justify-center w-[380px]">
              <img
                src="./img/bigproduct.png"
                alt=""
                className="w-[56px] h-[56px]"
              />
              <img
                src="./img/bigproduct.png"
                alt=""
                className="w-[56px] h-[56px]"
              />
              <img
                src="./img/bigproduct.png"
                alt=""
                className="w-[56px] h-[56px]"
              />
              <img
                src="./img/bigproduct.png"
                alt=""
                className="w-[56px] h-[56px]"
              />
              <img
                src="./img/bigproduct.png"
                alt=""
                className="w-[56px] h-[56px]"
              />
              <img
                src="./img/bigproduct.png"
                alt=""
                className="w-[56px] h-[56px]"
              />
            </div>
          </div>
          <div className="w-[400px]">
            <p className="text-[#00B517]">In stock</p>
            <p className="text-xl font-semibol">
              Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
            </p>
            <div className="flex gap-3 my-3">
              <div className="flex gap-2">
                <div className="flex justify-center items-center">
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                  <StarSvg />
                </div>
                <p className="text-[#FF9017]">9.3</p>
              </div>
              <div className="flex justify-center items-center">
                <DotSvg />
              </div>
              <div className="flex justify-center items-center gap-2">
                <ReviewSvg />
                <p>32 reviews</p>
              </div>
              <div className="flex justify-center items-center">
                <DotSvg />
              </div>
              <div className="flex justify-center items-center gap-2">
                <SoldSvg/>
                <p>154 sold</p>
              </div>
            </div>
            <div className="bg-[#FFF0DF] h-[72px] flex gap-10 pl-6 pt-2">
              <div>
                <p className="text-lg font-semibold text-[#FA3434]">$ 98.00</p>
                <p>50-100 pcs</p>
              </div>
              <div>
                <p className="text-lg font-semibold">$ 90.00</p>
                <p>100-700 pcs</p>
              </div>
              <div>
                <p className="text-lg font-semibold">$ 78.00</p>
                <p>700+ pcs</p>
              </div>
            </div>
            <div className="text-[#505050] mt-4">
              <div className="grid grid-rows-1 grid-cols-2 ">
                <div>Price</div>
                <div>Negotiable</div>
              </div>
              <div className="border-t-2 border-[rgb(224,224,224)] my-3"></div>
              <div className="grid grid-rows-3 grid-cols-2 ">
                <div>Type:</div>
                <div>Classic shoes</div>
                <div>Material:</div>
                <div>Plastic material</div>
                <div>Design:</div>
                <div>Modern nice</div>
              </div>
              <div className="border-t-2 border-[#E0E0E0] my-3"></div>
              <div className="grid grid-rows-3 grid-cols-2 ">
                <div>Customization: </div>
                <div>Customized logo and design custom packages</div>
                <div>Protection: </div>
                <div>Refund Policy</div>
                <div>Warranty: </div>
                <div>2 years full warranty </div>
              </div>
            </div>
          </div>
          <div className="w-[280px]">
            <div className="border-2 rounded-lg p-4 shadow-sm">
              <div className="flex gap-2 ">
                <div className="bg-[#C6F3F1] h-12 w-12"></div>
                <div>
                  <p>Supplier</p>
                  <p>Guanjoi Trading LLC</p>
                </div>
              </div>
              <div className="border-t-2 border-[#E0E0E0] my-3"></div>
              <div className="text-[#8B96A5] flex flex-col gap-3 my-3">
                <p>Germany, Berlin</p>
                <p>Verified Seller</p>
                <p>Worldwide shipping</p>
              </div>

              <div className="flex flex-col gap-2">
                <button className="h-10 rounded-md border-2 bg-[#0D6EFD] text-white">
                  Send inquiry
                </button>
                <button className="h-10 rounded-md border-2 text-[#0D6EFD] ">
                  Seller’s profile
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center h-6 text-[#0D6EFD] gap-2 my-3">
              <HeartSvg /> <p>Save for later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
