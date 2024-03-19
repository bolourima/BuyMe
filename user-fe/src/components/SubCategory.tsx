import React, { useState } from "react";
import Slider from "react-slider";
type Brand = {
  _id: string;
  brandName: string;
  category_id: String;
};

type Feature = {
  _id: string;
  featureName: string;
  category_id: string;
};

type SubCategory = {
  _id: string;
  categoryName: string;
  Brand: Brand[];
  Feature: Feature[];
};

export const SubCategory = () => {
  const mockDataSubCategory: SubCategory[] = [
    {
      _id: "kjaewnfkljn123",
      categoryName: "electronic1",
      Brand: [
        {
          _id: "brandid1",
          brandName: "brand1",
          category_id: "kjaewnfkljn123",
        },
        {
          _id: "brandid2",
          brandName: "brand2",
          category_id: "kjaewnfkljn123",
        },
        {
          _id: "brandid3",
          brandName: "brand3",
          category_id: "kjaewnfkljn123",
        },
      ],
      Feature: [
        {
          _id: "feature1",
          featureName: "feature1",
          category_id: "kjaewnfkljn123",
        },
        {
          _id: "feature2",
          featureName: "feature2",
          category_id: "kjaewnfkljn123",
        },
        {
          _id: "feature3",
          featureName: "feature3",
          category_id: "kjaewnfkljn123",
        },
        {
          _id: "feature4",
          featureName: "feature4",
          category_id: "kjaewnfkljn123",
        },
      ],
    },
    {
      _id: "kjaewnfkljn1234",
      categoryName: "electronic2",
      Brand: [
        {
          _id: "brandid1",
          brandName: "brand5",
          category_id: "kjaewnfkljn1234",
        },
        {
          _id: "brandid2",
          brandName: "brand6",
          category_id: "kjaewnfkljn1234",
        },
        {
          _id: "brandid3",
          brandName: "brand7",
          category_id: "kjaewnfkljn1234",
        },
      ],
      Feature: [
        {
          _id: "feature1",
          featureName: "feature5",
          category_id: "kjaewnfkljn1234",
        },
        {
          _id: "feature2",
          featureName: "feature6",
          category_id: "kjaewnfkljn1234",
        },
        {
          _id: "feature3",
          featureName: "feature7",
          category_id: "kjaewnfkljn1234",
        },
        {
          _id: "feature4",
          featureName: "feature8",
          category_id: "kjaewnfkljn1234",
        },
      ],
    },
    {
      _id: "kjaewnfkljn1245",
      categoryName: "electronic3",
      Brand: [
        {
          _id: "brandid1",
          brandName: "brand1",
          category_id: "kjaewnfkljn1245",
        },
        {
          _id: "brandid2",
          brandName: "brand2",
          category_id: "kjaewnfkljn1245",
        },
        {
          _id: "brandid3",
          brandName: "brand3",
          category_id: "kjaewnfkljn1245",
        },
      ],
      Feature: [
        {
          _id: "feature1",
          featureName: "feature1",
          category_id: "kjaewnfkljn1245",
        },
        {
          _id: "feature2",
          featureName: "feature1",
          category_id: "kjaewnfkljn1245",
        },
        {
          _id: "feature3",
          featureName: "feature1",
          category_id: "kjaewnfkljn1245",
        },
        {
          _id: "feature4",
          featureName: "feature1",
          category_id: "kjaewnfkljn1245",
        },
      ],
    },
  ];
  return (
    <div className="w-64 bg-gray-200 p-4">
      {/* Category */}
      <div className="mb-4">
        <div className="font-bold">Category</div>
        <div className="pl-4 mt-2">
          {mockDataSubCategory.map((subCategory) => (
            <div
              key={subCategory._id}
              className="cursor-pointer hover:bg-blue-200"
            >
              {subCategory.categoryName}
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-4">
        <div className="font-bold">Brands</div>
        <div className="pl-4 mt-2">
          {mockDataSubCategory[0].Brand.map((brand) => (
            <div key={brand._id} className="cursor-pointer hover:bg-blue-200">
              {brand.brandName}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <div className="font-bold">Features</div>
        <div className="pl-4 mt-2">
          {mockDataSubCategory[0].Feature.map((feature) => (
            <div key={feature._id} className="cursor-pointer hover:bg-blue-200">
              {feature.featureName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
