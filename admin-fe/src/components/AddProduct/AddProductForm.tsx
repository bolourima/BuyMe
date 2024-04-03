import React, { useEffect, useMemo, useState } from "react";
import { AddProductFirstSection } from "./AddProductFirstSection";
import { AddProductImageSection } from "./AddProductImageSection";
import { AddProductPriceSection } from "./AddProductPriceSection";
import { AddProductCategory } from "./AddProductCategory";
import { AddProductBrand } from "./AddProductBrand";
import { AddProductTag } from "./AddProductTag";
import { createProduct } from "@/utilities/createProduct";
import { SubCategory } from "@/types/subCategoryType";
import { getInital } from "@/validations/productInitial";
import { useFormik } from "formik";
import { instance } from "@/instance";
import { productSchema } from "@/validations/productSchema";
import { Category } from "@/types/categoryType";
import { GetProductType } from "@/types/getProductType";
import { editProduct } from "@/utilities/editProduct";

export const AddProductForm = ({
  categoryData,
  onEdit,
  editableProduct,
  setOnEdit,
  setEditableProduct,
  setIsAddProductVisible,
  token,
}: {
  categoryData: Category[];
  onEdit: boolean;
  editableProduct: GetProductType;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableProduct: any;
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    onEdit
      ? editableProduct && editableProduct.categoryId.name
      : categoryData[0].name
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    editableProduct ? editableProduct.brandName : ""
  );
  const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([
    {
      _id: "",
      name: "",
      category: { _id: "", name: "" },
      brands: [],
    },
  ]);
  const [subName, setSubName] = useState(
    editableProduct ? editableProduct.subCategoryName : subCategoryData[0].name
  );
  const [domSub, setDomSub] = useState<SubCategory[]>([]); // asfsdfds
  const [isSale, setIsSale] = useState(
    onEdit ? editableProduct.disCount.isSale : false
  );
  const [salePercent, setSalePercent] = useState<any>(
    onEdit ? editableProduct.disCount.salePercent : 0
  );
  const [imageOnePreview, setImageOnePreview] = useState<string>(
    onEdit ? editableProduct.images[0] : ""
  );
  const [imageTwoPreview, setImageTwoPreview] = useState<string>(
    onEdit ? editableProduct.images[1] : ""
  );
  const [imageThreePreview, setImageThreePreview] = useState<string>(
    onEdit ? editableProduct.images[2] : ""
  );
  const getSubCategoryByCategory = useMemo(async () => {
    const res = await instance.post("/getSubCategories", {
      name: selectedCategory,
    });
    const subCategory: SubCategory[] = res.data;
    setSubCategoryData(subCategory);
    setDomSub(subCategory);
    const selectedSubCategory: SubCategory[] = subCategory.filter((sub) => {
      return sub.name === subName;
    });
    setSelectedBrand(
      selectedSubCategory.length > 0 ? selectedSubCategory[0].brands[0] : ""
    );
    setSubName(
      selectedSubCategory.length > 0 ? selectedSubCategory[0].name : ""
    );
  }, [selectedCategory]);
  const preparingBrands = useMemo(async () => {
    setDomSub(
      subCategoryData.filter((el) => {
        return el.name === subName;
      })
    );
  }, [subName]);
  const { values, errors, handleChange, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: getInital(onEdit, editableProduct),
      validationSchema: productSchema,
      onSubmit: () => {
        const images: string[] = [];
        if (imageOnePreview && imageOnePreview !== "../waiting.png") {
          images.push(imageOnePreview);
        }
        if (imageTwoPreview && imageTwoPreview !== "../waiting.png") {
          images.push(imageTwoPreview);
        }
        if (imageThreePreview && imageThreePreview !== "../waiting.png") {
          images.push(imageThreePreview);
        }
        if (onEdit) {
          editProduct(
            editableProduct._id,
            images,
            values,
            isSale,
            salePercent,
            selectedCategory,
            subName,
            selectedBrand,
            setEditableProduct,
            setOnEdit,
            token
          );
        } else {
          createProduct(
            images,
            values,
            isSale,
            salePercent,
            selectedCategory,
            subName,
            selectedBrand,
            token
          );
        }
      },
    });
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex flex-col bg-[#F7F7F8] p-6 gap-6"
    >
      <div className="flex gap-6">
        <div className="flex flex-col gap-6">
          <AddProductFirstSection
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
          <AddProductImageSection
            imageOnePreview={imageOnePreview}
            imageTwoPreview={imageTwoPreview}
            imageThreePreview={imageThreePreview}
            setImageOnePreview={setImageOnePreview}
            setImageTwoPreview={setImageTwoPreview}
            setImageThreePreview={setImageThreePreview}
            token={token}
          />
          <AddProductPriceSection
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
        </div>
        <div className="flex  flex-col  w-[575px] gap-6">
          <AddProductCategory
            setSelectedCategory={setSelectedCategory}
            editableProduct={editableProduct}
            categoryData={categoryData}
            setSubName={setSubName}
            subName={subName}
            subCategoryData={subCategoryData}
          />
          <AddProductBrand
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            editableProduct={editableProduct}
            domSub={domSub}
            onEdit={onEdit}
            setIsSale={setIsSale}
            isSale={isSale}
            setSalePercent={setSalePercent}
          />
          <AddProductTag
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched}
          />
        </div>
      </div>
      <div className="flex gap-6 justify-end">
        <button
          type="submit"
          className="flex w-[113px] h-[56px] bg-black text-white rounded-lg justify-center items-center"
        >
          Нийтлэх
        </button>
      </div>
    </form>
  );
};
