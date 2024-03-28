import React from "react";
import { Category } from "@/types/categoryType";
import { GetProductType } from "@/types/getProductType";
import { AddProductForm } from "./AddProductForm";
import { LeftArrow } from "@/svg/LeftArrow";

export const AddProductBar = ({
  categoryData,
  setIsAddProductVisible,
  onEdit,
  setOnEdit,
  editableProduct,
  setEditableProduct,
}: {
  categoryData: Category[];
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: boolean;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editableProduct: GetProductType;
  setEditableProduct: any;
}) => {
  return (
    <>
      <div className="flex flex-col">
        <button
          onClick={() => {
            setIsAddProductVisible(false);
            setEditableProduct(null), setOnEdit(false);
          }}
          className="flex items-center pl-5 h-12 gap-4"
        >
          <button className="w-4 h-4">
            <LeftArrow />
          </button>
          <p>Буцах</p>
        </button>
        <AddProductForm
          categoryData={categoryData}
          onEdit={onEdit}
          editableProduct={editableProduct}
          setOnEdit={setOnEdit}
          setEditableProduct={setEditableProduct}
          setIsAddProductVisible={setIsAddProductVisible}
        />
      </div>
    </>
  );
};
