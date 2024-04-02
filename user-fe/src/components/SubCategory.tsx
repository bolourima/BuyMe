import { Slider } from "@mui/material";
import React, { useState } from "react";
const MAX = 100000000;
const MIN = 0;

function valuetext(value: number) {
  return `${value}MNT`;
}
const minDistance = 500000;
type typeBrand = {
  _id: string;
  name: string;
};

type typeFeature = {
  _id: string;
  name: string;
};

type typeCategory = {
  _id: string;
  categoryName: string;
  brands: typeBrand[];
  features: typeFeature[];
};

export const SubCategory = () => {
  const [value2, setValue2] = React.useState<number[]>([MIN, MAX]);

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
  const SubCategory: typeCategory[] = [
    {
      _id: "SubCategory1",
      categoryName: "Clothes",
      brands: [
        { _id: "brand1", name: "Top" },
        { _id: "brand2", name: "Dress" },
        { _id: "brand3", name: "Shirt" },
      ],
      features: [
        { _id: "feature1", name: "Bluetooth" },
        { _id: "feature2", name: "WiFi" },
      ],
    },
    {
      _id: "SubCategory2",
      categoryName: "Electronics",
      brands: [
        { _id: "brand1", name: "Phone" },
        { _id: "brand2", name: "Laptop" },
        { _id: "brand3", name: "PC" },
      ],
      features: [
        { _id: "features", name: "fuck" },
        { _id: "feature2", name: "WiFi" },
      ],
    },
    {
      _id: "SubCategory3",
      categoryName: "Books",
      brands: [
        { _id: "brand1", name: "Thriller" },
        { _id: "brand2", name: "Fiction" },
      ],
      features: [
        { _id: "feature1", name: "Bluetooth" },
        { _id: "feature2", name: "WiFi" },
      ],
    },
  ];
  const [isOpenCategory, setOpenCategory] = useState(true);
  const [isOpenBrands, setOpenBrands] = useState(true);
  const [isOpenFeatures, setOpenFeatures] = useState(true);
  const [isOpenColors, setOpenColors] = useState(true);
  const [subCategoryIndex, setCategoryIndex] = useState(1);
  const handlerSubCategory = (categoryindex: number) => {
    console.log(categoryindex);
    setCategoryIndex(categoryindex);
  };
  const handleOpenCategory = () => {
    console.log(isOpenCategory);
    setOpenCategory(!isOpenCategory);
  };
  const handleOpenColors = () => {
    console.log(isOpenCategory);
    setOpenColors(!isOpenColors);
  };
  const handleOpenBrands = () => {
    console.log(isOpenBrands);
    setOpenBrands(!isOpenBrands);
  };
  const handleOpenFeatures = () => {
    console.log(isOpenFeatures);
    setOpenFeatures(!isOpenFeatures);
  };

  return (
    <div className=" hidden lg:text-black w-[300px] rounded-lg p-4 lg:flex flex-col gap-5 border-2">
      {/* Category */}
      <div className="">
        <div className="flex justify-between " onClick={handleOpenCategory}>
          <button className="font-bold uppercase  ">Category</button>
          <p className={`${isOpenCategory ? " rotate-90" : ""}`}> &#62;</p>
        </div>

        <div className={`uppercase ml-1 pl-1 mt-3`}>
          {SubCategory.map((subCategory, index) => (
            <div className=" p-2 hover:bg-slate-300 rounded-l-lg">
              <button
                key={index}
                className={`transition-all uppercase ${
                  isOpenCategory ? "block" : "hidden"
                }`}
                onClick={() => handlerSubCategory(index)}
              >
                {subCategory.categoryName}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Brands */}
      <div className="">
        <div className="flex justify-between" onClick={handleOpenBrands}>
          <button className="font-bold uppercase">Subcategory</button>
          <p className={`${isOpenBrands ? " rotate-90" : ""}`}> &#62;</p>
        </div>
        <div className="pl-1 ml-1 uppercase mt-3">
          {SubCategory[subCategoryIndex].brands.map((brands) => (
            <div
              key={brands._id}
              className={` p-2 hover:bg-slate-300 rounded-l-lg ${
                isOpenBrands ? "block" : "hidden"
              }`}
            >
              <div className="flex gap-4">
                <input type="checkbox" className="" />
                {brands.name}
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

      <input type="text" value={`${value2[0]} MNT`} />
      <input type="text" value={`${value2[1]} MNT`} />
      {/* Brands */}
      <div className="">
        <div className="flex justify-between" onClick={handleOpenColors}>
          <button className="font-bold uppercase">filtered By colors</button>
          <p className={`${isOpenBrands ? " rotate-90" : ""}`}> &#62;</p>
        </div>
        <div className="pl-1 ml-1 uppercase mt-3">
          {SubCategory[subCategoryIndex].brands.map((brands) => (
            <div
              key={brands._id}
              className={` p-2 hover:bg-slate-300 rounded-l-lg ${
                isOpenBrands ? "block" : "hidden"
              }`}
            >
              {brands.name}
            </div>
          ))}
        </div>
      </div>
      {/* Features
      <div className="mb-4">
        <div className="flex justify-between" onClick={handleOpenFeatures}>
          <button className="font-bold">Features</button>
          <p className={`${isOpenFeatures ? " rotate-90" : ""}`}> &#62;</p>
        </div>
        <div className="pl-4 mt-2">
          {SubCategory[subCategoryIndex].features.map((feature) => (
            <div>
              <button
                key={feature._id}
                className={`hover:bg-blue-200 ${
                  isOpenFeatures ? "block" : "hidden"
                }`}
              >
                {feature.name}
              </button>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
