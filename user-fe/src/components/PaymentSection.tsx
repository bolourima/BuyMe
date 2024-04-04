import {
  AExpressIcon,
  ApplePayIcon,
  MasterCardIcon,
  PayPallIcon,
  VisaIcon,
} from "@/icon";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { createOrder } from "@/utilities/createOrder";

export const PaymentSection = ({
  total,
  productsInBasket,
  token,
  setQrcode,
}: {
  total: number;
  productsInBasket: ProductTypeWithQuantity[];
  token: string;
  setQrcode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-[400px] ">
      <div className="flex flex-col border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-white shadow-md">
        <div className="flex justify-center border-b-[1px] pb-4 text-xl font-sans font-semibold">
          PAYMENT DETAIL
        </div>
        <div className="flex justify-between my-4">
          <div className="text-[#1C1C1C]">
            <p className="text-xl">Total:</p>
          </div>
          <div className="text-[20px] ">
            <p className="font-semibold">{total.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() =>
              createOrder(productsInBasket, token, total, setQrcode)
            }
            className="bg-black text-white w-full h-[54px] rounded-lg"
          >
            Pay
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
  );
};
