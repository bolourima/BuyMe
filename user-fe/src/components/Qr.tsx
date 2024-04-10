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
  if (isPaid) {
    setTimeout(() => {
      setInvoice(invoiceInitial);
    }, 3000);
  }
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
    <div
      className={`w-[400px] h-[400px] absolute z-50 ${
        !isPaid && "bg-gray-200"
      }  rounded-xl flex justify-center items-center flex-col`}
    >
      {!isPaid ? (
        <div className="w-fit h-fit flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-semibold">Please scan by camera</p>
          <p>{formatTime(seconds)}</p>
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
          <div className="flex sm:hidden md:hidden lg:hidden flex-wrap gap-4">
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
            className="font-semibold text-2xl"
            onClick={() => {
              checkPayment(setIsPaid);
            }}
          >
            Check payment
          </button>
          <button
            className="font-semibold text-2xl"
            onClick={() => setInvoice(invoiceInitial)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-white p-8 rounded-xl">
          <p className="text-green-500 text-3xl font-semibold flex justify-center items-center">
            Paid
          </p>
          <div className="w-48 h-48">
            <Paid />
          </div>
          <button
            onClick={() => setInvoice(invoiceInitial)}
            className="bg-green-500 text-white text-2xl font-semibold w-48 h-16 rounded-xl"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};
