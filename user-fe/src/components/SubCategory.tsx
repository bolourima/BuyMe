import React, { useState, ChangeEvent } from "react";
import { Slider } from "@mui/material";
import { TypeSubCategory } from "@/types/subCategoryType";
import { categoryType } from "@/types/categoryType";
import Link from "next/link";
import { ArrowRightSquare } from "lucide-react";
const MAX: number = 100000;
const MIN: number = 0;
const minDistance: number = 10000;
function valuetext(value: number): string {
  return `${value}MNT`;
}
export const SubCategory = ({
  subCategoryData,
  categoryData,
}: {
  categoryData: categoryType[];
  subCategoryData: TypeSubCategory[];
}) => {
  const [value2, setValue2] = useState<number[]>([MIN, MAX]);

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], MAX - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

  const [isOpenCategory, setOpenCategory] = useState(true);
  const [isOpenSubCategory, setOpenSubCategory] = useState(true);
  const [isOpenBrands, setOpenBrands] = useState(true);
  const [subCategoryIndex, setCategoryIndex] = useState(1);

  const handlerSubCategory = (categoryindex: number) => {
    setCategoryIndex(categoryindex);
  };

  const handleOpenCategory = () => {
    setOpenCategory(!isOpenCategory);
  };

  const handleOpenBrands = () => {
    setOpenBrands(!isOpenBrands);
  };

  return (
    <div className="hidden lg:text-black w-[250px] rounded-lg shadow p-4 lg:flex flex-col gap-5 border-2">
      <div className="">
        <div
          className="flex justify-between border-b-2 pb-2"
          onClick={handleOpenCategory}
        >
          <button className="font-bold uppercase">Category</button>
          <p className={`${isOpenCategory ? " rotate-90" : ""}`}>
            <ArrowRightSquare className="text-gray-600" />
          </p>
        </div>
        <div className={`uppercase ml-1 pl-1 mt-3`}>
          {categoryData.map((subCategory, index) => (
            <Link href={`/productlist/${subCategory.name}`}>
              <div
                key={index}
                className={`p-2 hover:bg-slate-300 rounded-l-lg cursor-pointer ${
                  isOpenCategory ? "block" : "hidden"
                }`}
              >
                <button className={`transition-all uppercase `}>
                  {subCategory.name}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <div
          className="flex justify-between border-b-2 pb-2"
          onClick={handleOpenCategory}
        >
          <button className="font-bold uppercase">Subcategory</button>
          <p className={`${isOpenSubCategory ? " rotate-90" : ""}`}>
            <ArrowRightSquare className="text-gray-600" />
          </p>
        </div>
        <div className={`uppercase ml-1 pl-1 mt-3`}>
          {subCategoryData.map((subCategory, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-slate-300 rounded-l-lg cursor-pointer ${
                isOpenSubCategory ? "block" : "hidden"
              }`}
              onClick={() => handlerSubCategory(index)}
            >
              <button className={`transition-all uppercase `}>
                {subCategory.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <div
          className="flex justify-between border-b-2 pb-2"
          onClick={handleOpenBrands}
        >
          <button className="font-bold uppercase ">Brands</button>
          <p className={`${isOpenBrands ? " rotate-90" : ""}`}>
            <ArrowRightSquare className="text-gray-600" />
          </p>
        </div>
        <div className="pl-1 ml-1 uppercase mt-3">
          {subCategoryData[subCategoryIndex].brands.map((brand, index) => (
            <div
              key={index}
              className={`p-2 hover:bg-slate-300 rounded-l-lg ${
                isOpenBrands ? "block" : "hidden"
              }`}
            >
              <div className="flex gap-4">
                <input type="checkbox" className="" />
                {brand}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={MIN}
        max={MAX}
        disableSwap
      />
      <input type="text" value={`${value2[0]} MNT`} readOnly />
      <input type="text" value={`${value2[1]} MNT`} readOnly />
    </div>
  );
};
