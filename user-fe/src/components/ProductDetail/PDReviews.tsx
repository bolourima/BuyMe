import React from "react";

export const PDReviews = () => {
  return (
    <div className="p-6 flex gap-3">
      <img src="./img/avatar.png" alt="" className="h-10 w-10" />
      <div className="flex flex-col gap-2">
        <p className="font-semibold">User Name</p>
        <p>
          Crafted from premium, breathable fabrics, each shirt feels luxuriously
          soft against the skin, ensuring all-day comfort without compromising
          on style. The attention to detail in stitching and construction speaks
          volumes about the brand's commitment to quality, promising durability
          that withstands the test of time.
        </p>
      </div>
    </div>
  );
};
