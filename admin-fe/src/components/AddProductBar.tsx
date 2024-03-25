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
import { Trash } from "@/svg/Trash";

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
    onEdit
      ? editableProduct
        ? editableProduct.categoryId.name
        : ""
      : categoryData[0].name
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    editableProduct ? editableProduct.brandName : ""
  );
  const [subName, setSubName] = useState(
    editableProduct ? editableProduct.subCategoryName : ""
  );
  const [domSub, setDomSub] = useState<SubCategory[]>([]);
  const [isSale, setIsSale] = useState(
    onEdit ? editableProduct.disCount.isSale : false
  );
  const [salePercent, setSalePercent] = useState<any>(
    onEdit ? editableProduct.disCount.salePercent : 0
  );
  const [images, setImages] = useState<File[]>([]);
  const [imageOnePreview, setImageOnePreview] = useState<string>("");
  const [firstFile, setFirstFile] = useState<File>();
  const [imageTwoPreview, setImageTwoPreview] = useState<string>("");
  const [secondFile, setSecondFile] = useState<File>();
  const [imageThreePreview, setImageThreePreview] = useState<string>("");
  const [thirdFile, setThirdFile] = useState<File>();
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
    if (status == 400) return alert("Failed to update");
    if (status == 403) return alert("ProductCode conflict");
  };
  console.log("first");
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
                  <label className="flex cursor-pointer relative w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                    <IconPic />
                    {onEdit && editableProduct.images[0] && (
                      <div className="absolute w-full h-full rounded-xl flex justify-end">
                        <img
                          src={editableProduct.images[0]}
                          alt="Product Image"
                          className="w-full h-full rounded-xl"
                        />
                        <button className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1">
                          <Trash />
                        </button>
                      </div>
                    )}
                    {imageOnePreview ? (
                      <div className="absolute w-full h-full z-30 flex justify-end">
                        <img className="w-full h-full" src={imageOnePreview} />
                        <button
                          type="button"
                          onClick={(e) => {
                            setImageOnePreview(""),
                              setImages(
                                images.filter((el) => {
                                  return el.name !== firstFile?.name;
                                })
                              );
                          }}
                          className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
                        >
                          <Trash />
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        hidden
                        multiple={false}
                        className="relative"
                        onChange={(e) => {
                          if (!e.target.files || e.target.files.length === 0) {
                            return;
                          }
                          setFirstFile(e.target.files[0]);
                          setImageOnePreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                          setImages([...images, e.target.files[0]]);
                        }}
                      />
                    )}
                  </label>

                  <label className="flex relative cursor-pointer w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                    <IconPic />
                    {onEdit && editableProduct.images[1] && (
                      <div className="absolute w-full h-full rounded-xl flex justify-end">
                        <img
                          src={editableProduct.images[1]}
                          alt="Product Image"
                          className="w-full h-full rounded-xl"
                        />
                        <button
                          type="button"
                          className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
                        >
                          <Trash />
                        </button>
                      </div>
                    )}
                    {imageTwoPreview ? (
                      <div className="absolute w-full h-full z-30 flex justify-end">
                        <img className="w-full h-full" src={imageTwoPreview} />
                        <button
                          type="button"
                          onClick={(e) => {
                            setImageTwoPreview(""),
                              setImages(
                                images.filter((el) => {
                                  return el.name !== secondFile?.name;
                                })
                              );
                          }}
                          className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
                        >
                          <Trash />
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        hidden
                        multiple={false}
                        className="relative"
                        onChange={(e) => {
                          if (!e.target.files || e.target.files.length === 0) {
                            return;
                          }
                          setSecondFile(e.target.files[0]);
                          setImageTwoPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                          setImages([...images, e.target.files[0]]);
                        }}
                      />
                    )}
                  </label>
                  <label className="flex relative cursor-pointer w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
                    <IconPic />
                    {onEdit && editableProduct.images[2] && (
                      <div className="absolute w-full h-full rounded-xl flex justify-end">
                        <img
                          src={editableProduct.images[2]}
                          alt="Product Image"
                          className="w-full h-full rounded-xl"
                        />
                        <button
                          type="button"
                          className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
                        >
                          <Trash />
                        </button>
                      </div>
                    )}
                    {imageThreePreview ? (
                      <div className="absolute w-full h-full z-30 flex justify-end">
                        <img
                          className="w-full h-full"
                          src={imageThreePreview}
                        />
                        <button
                          onClick={(e) => {
                            setImageThreePreview(""),
                              setImages(
                                images.filter((el) => {
                                  return el.name !== thirdFile?.name;
                                })
                              );
                          }}
                          className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
                        >
                          <Trash />
                        </button>
                      </div>
                    ) : (
                      <input
                        type="file"
                        hidden
                        multiple={false}
                        className="relative"
                        onChange={(e) => {
                          if (!e.target.files || e.target.files.length === 0) {
                            return;
                          }
                          setThirdFile(e.target.files[0]);
                          setImageThreePreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                          setImages([...images, e.target.files[0]]);
                        }}
                      />
                    )}
                  </label>
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
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-8 rounded-lg bg-[#F7F7F8]"
                    defaultValue={
                      editableProduct ? editableProduct.categoryId.name : ""
                    }
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
                    value={
                      editableProduct ? editableProduct.subCategoryName : ""
                    }
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
                  <label className="text-gray-600 text-xs">
                    Хямдралтай эсэх
                  </label>
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
