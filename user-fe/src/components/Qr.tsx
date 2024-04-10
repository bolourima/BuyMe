import { checkPayment } from "@/helper/checkPayment";
import { formatTime } from "@/helper/formatDate";
import { Paid } from "@/icon/Paid";
import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

export const Qr = ({
  qrcode,
  setQrcode,
}: {
  qrcode: string;
  setQrcode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { Canvas } = useQRCode();
  const [isPaid, setIsPaid] = useState(false);
  if (isPaid) {
    setTimeout(() => {
      setQrcode("");
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
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-semibold">Please scan by camera</p>
          <p>{formatTime(seconds)}</p>
          <Canvas
            text={qrcode}
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
            onClick={() => setQrcode("")}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <p className="text-green-500 text-3xl font-semibold flex justify-center items-center">
            Paid
          </p>
          <div className="w-48 h-48">
            <Paid />
          </div>
          <button
            onClick={() => setQrcode("")}
            className="bg-green-500 text-white text-2xl font-semibold w-48 h-16 rounded-xl"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};
