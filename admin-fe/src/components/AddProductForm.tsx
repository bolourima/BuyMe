import React, { useMemo, useState } from "react";
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

export const AddProductForm = ({
  categoryData,
  onEdit,
  editableProduct,
  setOnEdit,
  setEditableProduct,
  setIsAddProductVisible,
}: {
  categoryData: Category[];
  onEdit: boolean;
  editableProduct: GetProductType;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableProduct: any;
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    onEdit
      ? editableProduct
        ? editableProduct.categoryId.name
        : ""
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
      brands: [
        {
          name: "",
          _id: "",
        },
      ],
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
  const [images, setImages] = useState<File[]>([]);
  const [imageOnePreview, setImageOnePreview] = useState<string>(
    onEdit ? editableProduct.images[0] : ""
  );
  const [imageTwoPreview, setImageTwoPreview] = useState<string>(
    onEdit ? editableProduct.images[1] : ""
  );
  const [imageThreePreview, setImageThreePreview] = useState<string>(
    onEdit ? editableProduct.images[2] : ""
  );
  const [oldImages, setOldImages] = useState<string[]>([]);
  const { values, errors, handleChange, handleBlur, touched } = useFormik({
    initialValues: getInital(onEdit, editableProduct),
    validationSchema: productSchema,
    onSubmit: () => {},
  });
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
      selectedSubCategory.length > 0
        ? selectedSubCategory[0].brands[0].name
        : ""
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
  const creatingProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldImages = [];
    if (imageOnePreview && imageOnePreview.split("")[0] !== "b") {
      oldImages.push(imageOnePreview);
    }
    if (imageTwoPreview && imageTwoPreview.split("")[0] !== "b") {
      oldImages.push(imageTwoPreview);
    }
    if (imageThreePreview && imageThreePreview.split("")[0] !== "b") {
      oldImages.push(imageThreePreview);
    }
    const status = await createProduct(
      editableProduct && editableProduct._id,
      values,
      touched,
      errors,
      images,
      isSale,
      salePercent,
      selectedCategory,
      subName,
      selectedBrand,
      onEdit,
      setOnEdit,
      setEditableProduct,
      oldImages
    );
    if (status == 201) {
      setIsAddProductVisible(false);
      return alert("Successfully created");
    }
    if (status == 200) {
      setIsAddProductVisible(false);
      return alert("Successfully updated");
    }
    if (status == 400) return alert("Failed to update");
    if (status == 403) return alert("ProductCode coincided");
  };
  return (
    <form
      onSubmit={(e) => {
        creatingProduct(e);
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
            images={images}
            setImages={setImages}
            imageOnePreview={imageOnePreview}
            imageTwoPreview={imageTwoPreview}
            imageThreePreview={imageThreePreview}
            setImageOnePreview={setImageOnePreview}
            setImageTwoPreview={setImageTwoPreview}
            setImageThreePreview={setImageThreePreview}
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
