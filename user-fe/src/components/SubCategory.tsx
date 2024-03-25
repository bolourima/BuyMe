import { Slider } from "@mui/material";
import { stringify } from "querystring";
import React, { useState } from "react";
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
  const SubCategory: typeCategory[] = [
    {
      _id: "SubCategory1",
      categoryName: "electronic1",
      brands: [
        { _id: "brand1", name: "Samsung" },
        { _id: "brand2", name: "Apple" },
      ],
      features: [
        { _id: "feature1", name: "Bluetooth" },
        { _id: "feature2", name: "WiFi" },
      ],
    },
    {
      _id: "SubCategory2",
      categoryName: "electronic2",
      brands: [
        { _id: "brand1", name: "shit" },
        { _id: "brand2", name: "Apple" },
      ],
      features: [
        { _id: "features", name: "fuck" },
        { _id: "feature2", name: "WiFi" },
      ],
    },
    {
      _id: "SubCategory3",
      categoryName: "electronic3",
      brands: [
        { _id: "brand1", name: "bumaa" },
        { _id: "brand2", name: "Apple" },
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
  const [subCategoryIndex, setCategoryIndex] = useState(1);
  const handlerSubCategory = (categoryindex: number) => {
    console.log(categoryindex);
    setCategoryIndex(categoryindex);
  };
  const handleOpenCategory = () => {
    console.log(isOpenCategory);
    setOpenCategory(!isOpenCategory);
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
    <div className="w-64 bg-gray-200 p-4">
      {/* Category */}
      <div className="mb-4">
        <div className="flex justify-between" onClick={handleOpenCategory}>
          <button className="font-bold">Category</button>
          <p className={`${isOpenCategory ? " rotate-90" : ""}`}> &#62;</p>
        </div>

        <div className={`pl-4 mt-2 `}>
          {SubCategory.map((subCategory, index) => (
            <div>
              <button
                key={index}
                className={`hover:bg-blue-200 transition-all ${
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
      <div className="mb-4">
        <div className="flex justify-between" onClick={handleOpenBrands}>
          <button className="font-bold">Brands</button>
          <p className={`${isOpenBrands ? " rotate-90" : ""}`}> &#62;</p>
        </div>
        <div className="pl-4 mt-2">
          {SubCategory[subCategoryIndex].brands.map((brands) => (
            <div>
              <div
                key={brands._id}
                className={`hover:bg-blue-200 ${
                  isOpenBrands ? "block" : "hidden"
                }`}
              >
                <input type="checkbox" />
                {brands.name}
              </div>
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
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={[10, 50]}
        onChange={() => {}}
        valueLabelDisplay="auto"
        getAriaValueText={(number) => `${number}`}
        disableSwap
      />
    </div>
  );
};
