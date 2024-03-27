import { GetProductType } from "@/types/getProductType";
import { SubCategory } from "@/types/subCategoryType";
import React from "react";

export const AddProductBrand = ({
  setSelectedBrand,
  editableProduct,
  domSub,
  onEdit,
  setIsSale,
  isSale,
  setSalePercent,
}: {
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  editableProduct: GetProductType;
  domSub: SubCategory[];
  onEdit: boolean;
  setIsSale: React.Dispatch<React.SetStateAction<boolean>>;
  isSale: boolean;
  setSalePercent: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
      <select
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="w-full h-8 rounded-lg bg-[#F7F7F8]"
        id="brandName"
        value={editableProduct ? editableProduct.brandName : ""}
      >
        {domSub.map((sub) =>
          sub.brands.map((brand) => (
            <option key={brand._id} value={brand.name}>
              {brand.name}
            </option>
          ))
        )}
      </select>

      <div className="flex items-center px-4 gap-4">
        {onEdit ? (
          <input
            type="checkbox"
            onChange={(e) => {
              setIsSale(e.target.checked);
            }}
            defaultChecked={editableProduct.disCount.isSale}
          />
        ) : (
          <div className="form-control">
            <input
              onChange={(e) => {
                setIsSale(e.target.checked);
              }}
              type="checkbox"
              className="toggle"
            />
          </div>
        )}
        <label className="text-gray-600 text-xs">Хямдралтай эсэх</label>
      </div>
      {onEdit && isSale ? (
        <input
          type="number"
          defaultValue={editableProduct.disCount.salePercent}
          onChange={(e) => setSalePercent(e.target.value)}
          className="bg-gray-100 pl-4 h-12 rounded-lg"
        />
      ) : (
        <div>
          {!isSale ? (
            <input
              className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
              type="number"
              disabled
            />
          ) : (
            <input
              id="salePercent"
              onChange={(e) => setSalePercent(e.target.value)}
              className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
              type="number"
            />
          )}
        </div>
      )}
    </div>
  );
};
