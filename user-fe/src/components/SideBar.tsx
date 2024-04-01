import CloseIcon from "@/icon/CloseIcon";
import React from "react";

export default function SideBar({ OpenBar }: { OpenBar: () => void }) {
  return (
    <div className="absolute top-0 w-full right-0 h-full z-10 bg-zinc-950/50">
      <div className="flex justify-between p-5 bg-white w-10/12 h-full">
        <div>
          <h1 className="text-black">Hello</h1>
        </div>
        <div className="w-5" onClick={OpenBar}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
