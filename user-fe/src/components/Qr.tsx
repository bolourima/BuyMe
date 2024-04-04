import { checkPayment } from "@/helper/checkPayment";
import { useQRCode } from "next-qrcode";

export const Qr = ({ qrcode }: { qrcode: string }) => {
  const { Canvas } = useQRCode();
  return (
    <div className="w-[400px] h-[400px] absolute z-50 bg-gray-200 rounded-xl flex justify-center items-center flex-col gap-4">
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
      <button
        className="text-black font-semibold text-2xl"
        onClick={() => {
          checkPayment();
        }}
      >
        Төлбөр шалгах
      </button>
    </div>
  );
};
