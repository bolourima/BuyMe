import { useState } from "react";
import { AddressInput } from "./AddressInput";
import { InvoiceType } from "@/types/invoiceType";

export const PaymentSection = ({
  total,
  token,
  setInvoice,
  setLoading,
}: {
  total: number;
  token: string;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceType>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full lg:w-[400px] mt-6 lg:mt-0">
      <div className=" static flex flex-col border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-[#FBFBFB] shadow-md">
        <div className="flex justify-center border-b-[1px] pb-4 text-xl font-sans font-semibold ">
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
        <div className="mt-4 ">
          <div>
            <button
              className="bg-black text-white w-full h-[54px] rounded-lg hover:bg-gray-400 hover:text-black hover:font-bold"
              onClick={openModal}
            >
              Order
            </button>
            {isOpen && (
              <div className="flex flex-col gap-3 absolute top-[78px] right-0 bottom-0  w-full bg-gray-600 bg-opacity-60  h-[740px]">
                <dialog
                  open
                  id="my_modal_1"
                  className="modal w-full lg:w-[400px] rounded-xl"
                >
                  <AddressInput
                    total={total}
                    token={token}
                    setInvoice={setInvoice}
                    setLoading={setLoading}
                  />
                  <button
                    className="w-full flex justify-center py-4"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
