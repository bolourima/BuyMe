import React, { useState } from "react";
import { ProductsController } from "./ProductsController";
import { AddProductBar } from "./AddProductBar";
import { Category } from "@/types/categoryType";
import { Product } from "@/types/productType";
import { GetProductType } from "@/types/getProductType";
import DataTable from "./DataTable";

export const MainProducts = ({
  categoryData,
  productData,
}: {
  categoryData: Category[];
  productData: GetProductType[];
}) => {
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [editableProduct, setEditableProduct] = useState<GetProductType>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    productCode: 0,
    quantity: 0,
    tag: "",
    disCount: { isSale: false, salePercent: 0 },
    categoryId: { _id: "", name: "" },
    subCategoryName: "",
    brandName: "",
    createdAt: "",
    images: [],
  });
  return (
    <div className="flex flex-col">
      {!isAddProductVisible && (
        <ProductsController
          setIsAddProductVisible={setIsAddProductVisible}
          productData={productData}
          setOnEdit={setOnEdit}
          setEditableProduct={setEditableProduct}
        />
      )}
      {!isAddProductVisible && (
        <DataTable
          setIsAddProductVisible={setIsAddProductVisible}
          productData={productData}
          setOnEdit={setOnEdit}
          setEditableProduct={setEditableProduct}
        />
      )}

      {isAddProductVisible && (
        <AddProductBar
          categoryData={categoryData}
          setIsAddProductVisible={setIsAddProductVisible}
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          editableProduct={editableProduct}
          setEditableProduct={setEditableProduct}
        />
      )}
    </div>
  );
};
