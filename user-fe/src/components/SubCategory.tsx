import React, { useState, ChangeEvent, useContext } from "react";
import { Slider } from "@mui/material";
import { TypeSubCategory } from "@/types/subCategoryType";
import { categoryType } from "@/types/categoryType";
import Link from "next/link";
import { ArrowRightSquare } from "lucide-react";
import { useRouter } from "next/router";
import { toastifySuccess } from "@/utilities/toastify";
import { stringify } from "querystring";
import { instance } from "@/instance";
import { filterBrandName } from "@/utilities/filter";
import { SearchInputContext } from "@/context/searchContext";
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
  const { searchedProduct, setSearchedProduct } =
    useContext(SearchInputContext);
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const handleBrandCheckbox = (brand: string) => {
    if (checkedBrands.includes(brand)) {
      setCheckedBrands(checkedBrands.filter((brand) => brand !== brand));
    } else {
      setCheckedBrands([...checkedBrands, brand]);
    }
  };
  const router = useRouter();

  const [value, setValue] = useState<number[]>([MIN, MAX]);

  const handleChange = (
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
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  const [isOpenCategory, setOpenCategory] = useState(true);
  const [isOpenSubCategory, setOpenSubCategory] = useState(true);
  const [isOpenBrands, setOpenBrands] = useState(true);
  const [subCategoryIndex, setCategoryIndex] = useState(1);

  const handlerSubCategory = (
    categoryindex: number,
    subCategoryName: string
  ) => {
    setCategoryIndex(categoryindex);
    let category = router.query.category;
    if (!category) {
      const filteredCategory = subCategoryData.filter((el) => {
        return el.name === subCategoryName;
      });
      category = filteredCategory[0].category.name;
    }

    router.push(`/productlist/${category}/${subCategoryName}`);
  };

  const handleOpenCategory = () => {
    setOpenCategory(!isOpenCategory);
  };

  const handleOpenBrands = () => {
    setOpenBrands(!isOpenBrands);
  };
  const handleSubmit = () => {
    filterBrandName(value, setSearchedProduct);
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
          {categoryData.map((Category, index) => (
            <Link href={`/productlist/${Category.name}`}>
              <div
                key={index}
                className={`p-2 hover:bg-slate-300 rounded-l-lg cursor-pointer ${
                  isOpenCategory ? "block" : "hidden"
                }`}
              >
                <button className={`transition-all uppercase `}>
                  {Category.name}
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
              onClick={() => handlerSubCategory(index, subCategory.name)}
            >
              <button className={`transition-all uppercase `}>
                {subCategory.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between border-b-2 pb-2 font-bold uppercase">
        Budget Range
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={MIN}
        max={MAX}
        aria-label="Temperature"
        defaultValue={30}
        // color="primary"
        style={{ color: "black" }}
      />
      <div className="flex">
        <input
          type="text"
          className="w-1/2"
          value={`${value[0].toLocaleString()}₮`}
        />

        <input
          type="text"
          className="w-1/2"
          value={`${value[1].toLocaleString()}₮`}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
