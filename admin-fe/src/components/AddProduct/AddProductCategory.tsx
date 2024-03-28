import { Category } from "@/types/categoryType";
import { GetProductType } from "@/types/getProductType";
import { SubCategory } from "@/types/subCategoryType";
import React from "react";

export const AddProductCategory = ({
  setSelectedCategory,
  editableProduct,
  categoryData,
  setSubName,
  subName,
  subCategoryData,
}: {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  editableProduct: GetProductType;
  categoryData: Category[];
  setSubName: React.Dispatch<React.SetStateAction<string>>;
  subName: string;
  subCategoryData: SubCategory[];
}) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-6 ">
      <div className="flex flex-col gap-2">
        <span className="">Ерөнхий ангилал</span>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full h-8 rounded-lg bg-[#F7F7F8]"
          defaultValue={editableProduct ? editableProduct.categoryId.name : ""}
        >
          {categoryData.length > 0 &&
            categoryData.map((el) => {
              return (
                <option
                  value={el.name}
                  id={el._id}
                  className="text-black"
                  key={el._id}
                >
                  {el.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <span className="">Дэд ангилал</span>
        <select
          onChange={(e) => setSubName(e.target.value)}
          id="sub-category"
          className="w-full h-8 rounded-lg bg-[#F7F7F8]"
          value={subName}
        >
          {subCategoryData.map((el) => (
            <option
              value={el.name}
              id={el._id}
              className="text-black"
              key={el._id}
            >
              {el.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
