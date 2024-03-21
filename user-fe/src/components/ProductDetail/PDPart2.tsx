import React, { useState } from "react";
import { PDDescription } from "./PDDescription";
import { PDReviews } from "./PDReviews";
import { PDShipping } from "./PDShipping";
import { PDSeller } from "./PDSeller";

export const PDPart2 = () => {
  const [onDescription, setOnDescription] = useState(true);
  const [onReviews, setOnReviews] = useState(false);
  const [onShipping, setOnShipping] = useState(false);
  const [onSeller, setOnSeller] = useState(false);

  const ChangeBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = (event.target as HTMLButtonElement).innerText;

    // Reset all states
    setOnDescription(false);
    setOnReviews(false);
    setOnShipping(false);
    setOnSeller(false);

    // Set the state of the clicked tab to true
    if (buttonText === "Description") {
      setOnDescription(true);
    } else if (buttonText === "Reviews") {
      setOnReviews(true);
    } else if (buttonText === "Shipping") {
      setOnShipping(true);
    } else if (buttonText === "About seller") {
      setOnSeller(true);
    }
  };

  return (
    <div className="w-[880px] border-2 rounded-md border-[#DEE2E7] text-[#505050]">
      <div className="flex gap-5 border-2 h-12 p-3">
        <button onClick={ChangeBtn}>Description</button>
        <button onClick={ChangeBtn}>Reviews</button>
        <button onClick={ChangeBtn}>Shipping</button>
        <button onClick={ChangeBtn}>About seller</button>
      </div>
      {onDescription && <PDDescription />}
      {onReviews && <PDReviews />}
      {onShipping && <PDShipping />}
      {onSeller && <PDSeller />}
    </div>
  );
};
