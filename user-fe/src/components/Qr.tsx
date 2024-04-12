import { checkPayment } from "@/helper/checkPayment";
import { formatTime } from "@/helper/formatDate";
import { Paid } from "@/icon/Paid";
import { invoiceInitial } from "@/types/invoiceInitial";
import { InvoiceType } from "@/types/invoiceType";
import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

export const Qr = ({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceType;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceType>>;
}) => {
  const { Canvas } = useQRCode();
  const [isPaid, setIsPaid] = useState(false);
  // if (isPaid) {
  //   setTimeout(() => {
  //     setInvoice(invoiceInitial);
  //   }, 3000);
  // }
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <div className="w-full lg:w-[450px] px-8 h-fit mt-24 flex justify-center items-center absolute z-50">
      <div
        className={`w-full h-full  ${
          !isPaid && ""
        }  rounded-xl flex  justify-center items-center py-8 lg:px-24 lg:py-8 flex-col`}
      >
        {!isPaid ? (
          <div className="w-fit h-fit flex flex-col gap-4 justify-center items-center bg-gray-200 rounded-lg p-3">
            <p className="hidden lg:flex text-xl font-semibold justify-center w-[300px]">
              Please scan by camera
            </p>
            <p>{formatTime(seconds)}</p>
            <div className="hidden lg:block">
              <Canvas
                text={invoice.qPay_shortUrl}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: "#000",
                    light: "#fff",
                  },
                }}
              />
            </div>

            <div className="flex sm:hidden md:hidden lg:hidden flex-wrap justify-center items-center gap-4">
              {invoice.urls.map((url) => {
                return (
                  <a href={url.link}>
                    <img className="w-12 h-12" src={url.logo} />
                  </a>
                );
              })}
            </div>
            <div className="w-full h-fit flex flex-wrap gap-4"></div>
            <button
              className="font-semibold text-lg border-2 rounded-xl bg-gray-900 text-white p-3 hover:bg-gray-600"
              onClick={() => {
                checkPayment(setIsPaid);
              }}
            >
              Check payment
            </button>
            <button
              className="font-semibold text-lg text-red-700"
              onClick={() => setInvoice(invoiceInitial)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="w-[350px] h-full flex flex-col gap-8 justify-center items-center bg-white p-8 rounded-xl">
            <p className="text-green-500 text-3xl font-semibold flex justify-center items-center">
              Order confirmed
            </p>
            <div className="w-12 h-12">
              <Paid />
            </div>
            <button
              onClick={() => setInvoice(invoiceInitial)}
              className="bg-green-500 text-white text-lg font-semibold w-48 h-12 rounded-xl"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
