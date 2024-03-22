import React, { useMemo, useState } from "react";
import { LeftArrow } from "@/svg/LeftArrow";
import { IconPic } from "@/svg/IconPic";
import { productSchema } from "@/validations/productSchema";
import { useFormik } from "formik";
import { createProduct } from "@/utilities/createProduct";
import { Category } from "@/types/categoryType";
import { SubCategory } from "@/types/subCategoryType";
import { instance } from "@/instance";
import { GetProductType } from "@/types/getProductType";

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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    editableProduct.categoryId.name
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    editableProduct.brandName
  );
  const [selectedSub, setSelectedSub] = useState<SubCategory[]>([]);
  const [domSub, setDomSub] = useState<SubCategory[]>([]);
  const [isSale, setIsSale] = useState(false);
  const [salePercent, setSalePercent] = useState<any>(0);
  const [subName, setSubName] = useState(editableProduct.subCategoryName);
  const [images, setImages] = useState<FileList>();
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
  const { values, errors, handleChange, handleBlur, touched } = useFormik({
    initialValues: {
      name: onEdit ? editableProduct.name : "",
      description: onEdit ? editableProduct.description : "",
      productCode: onEdit ? editableProduct.productCode : 0,
      price: onEdit ? editableProduct.price : 0,
      quantity: onEdit ? editableProduct.quantity : 0,
      tag: onEdit ? editableProduct.tag : "",
    },
    validationSchema: productSchema,
    onSubmit: () => {},
  });
  const getSubCategoryByCategory = useMemo(async () => {
    const res = await instance.post(
      "/getSubCategories",
      { name: selectedCategory },
      { headers: { "Content-Type": "application/json" } }
    );
    const subCategory: SubCategory[] = res.data;
    setSubCategoryData(subCategory);
    setSelectedSub(subCategory);
    setDomSub(subCategory);
    setSelectedBrand(subCategory[0].brands[0].name);
    setSubName(subCategory[0].name);
  }, [selectedCategory]);
  const preparingBrands = useMemo(async () => {
    setDomSub(
      selectedSub.filter((el) => {
        return el.name === subName;
      })
    );
  }, [subName]);
  const creatingProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await createProduct(
      editableProduct._id,
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
      editableProduct.images
    );
    setIsAddProductVisible(false);
    if (status == 201) return alert("Successfully created");
    if (status == 200) return alert("Successfully updated");
  };
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
        <form
          onSubmit={(e) => {
            creatingProduct(e);
          }}
          className="flex flex-col bg-[#F7F7F8] p-6 gap-6"
        >
          <div className="flex gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex  flex-col bg-white rounded-lg w-[563px] p-6 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="">Бүтээгдэхүүний нэр</span>
                  <input
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                    type="text"
                    placeholder="Нэр"
                  />
                  {errors.name && touched.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="">Нэмэлт мэдээлэл</span>
                  <input
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                    type="text"
                    placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
                  />
                  {errors.description && touched.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="">Барааны код</span>
                  <input
                    id="productCode"
                    value={values.productCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                    type="text"
                    placeholder="Н#12345678"
                  />
                  {errors.productCode && touched.productCode && (
                    <p className="text-sm text-red-500">{errors.productCode}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col bg-white w-[563px] rounded-lg p-6 gap-4">
                <div>
                  <span>Бүтээгдэхүүний зураг</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                    <IconPic />
                  </div>
                  <div className="flex w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                    <IconPic />
                  </div>
                  <div className="flex w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                    <IconPic />
                  </div>
                  <div className="flex w-[125px] h-[125px] justify-center items-center ">
                    <input
                      type="file"
                      multiple={true}
                      onChange={(e) => {
                        if (!e.target.files) {
                          return;
                        }
                        setImages(e.target.files);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex bg-white rounded-lg w-[563px] p-6 gap-4">
                <div className="flex flex-col w-1/2 gap-2">
                  <span className="">Үндсэн үнэ</span>
                  <input
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                    type="text"
                    placeholder="Үндсэн үнэ"
                  />
                  {errors.price && touched.price && (
                    <p className="text-sm text-red-500">{errors.price}</p>
                  )}
                </div>

                <div className="flex flex-col w-1/2 gap-2">
                  <span className="">Үлдэгдэл тоо ширхэг</span>
                  <input
                    id="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                    type="text"
                    placeholder="Үлдэгдэл тоо ширхэг"
                  />
                  {errors.quantity && touched.quantity && (
                    <p className="text-sm text-red-500">{errors.quantity}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex  flex-col  w-[575px] gap-6">
              <div className="flex flex-col gap-4 bg-white rounded-lg p-6 ">
                <div className="flex flex-col gap-2">
                  <span className="">Ерөнхий ангилал</span>
                  <select
                    id="category"
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                    className="w-full h-8 rounded-lg bg-[#F7F7F8]"
                    defaultValue={editableProduct.categoryId.name}
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
                    defaultValue={editableProduct.subCategoryName}
                  >
                    {subCategoryData.map((el) => {
                      return (
                        <option
                          value={el.name}
                          className="text-black"
                          key={el._id}
                        >
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
                <select
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full h-8 rounded-lg bg-[#F7F7F8]"
                >
                  {domSub.map((sub) => {
                    return (
                      <option id={sub._id}>
                        {sub.brands.map((brand) => {
                          return brand.name;
                        })}
                      </option>
                    );
                  })}
                </select>
                <div className="flex items-center px-4 gap-4">
                  {onEdit ? (
                    <input
                      type="checkbox"
                      checked={editableProduct.disCount.isSale}
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
                  <label className="text-gray-600 text-xs">
                    Хямдралтай эсэх
                  </label>
                </div>
                {onEdit ? (
                  <input
                    type="number"
                    defaultValue={editableProduct.disCount.salePercent}
                    className="bg-gray-100 pl-4 h-12 rounded-lg"
                    placeholder="10"
                  />
                ) : (
                  <div>
                    {!isSale ? (
                      <input
                        className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
                        placeholder="20%"
                        type="number"
                        disabled
                      />
                    ) : (
                      <input
                        id="salePercent"
                        onChange={(e) => setSalePercent(e.target.value)}
                        className="w-11/12 text-black rounded-lg h-12 mx-4 px-4 bg-gray-100"
                        placeholder="20%"
                        type="number"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
                <span className="">Таг</span>
                <input
                  id="tag"
                  value={values.tag}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-2 border-1 bg-[#F7F7F8] rounded-lg"
                  type="text"
                  placeholder="Таг нэмэх ..."
                />
                {errors.tag && touched.tag && (
                  <p className="text-sm text-red-500">{errors.tag}</p>
                )}
                <span>Санал болгох: Гутал , Цүнх , Эмэгтэй </span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 justify-end">
            {/* <button className="flex w-[113px] h-[56px] border-[#D6D8DB] border-2 rounded-lg justify-center items-center">
              Ноорог
            </button> */}
            <button
              type="submit"
              className="flex w-[113px] h-[56px] bg-black text-white rounded-lg justify-center items-center"
            >
              Нийтлэх
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
