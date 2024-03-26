import { instance } from "@/instance";
import { Edit } from "@/svg/Edit";
import { IconCategory } from "@/svg/IconCategory";
import { IconDollar } from "@/svg/IconDollar";
import { IconMonthly } from "@/svg/IconMonthly";
import { IconSearch } from "@/svg/IconSearch";
import { Trash } from "@/svg/Trash";
import { GetProductType } from "@/types/getProductType";
import React from "react";

export const ProductsController = ({
  setIsAddProductVisible,
  productData,
  setOnEdit,
  setEditableProduct,
}: {
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  productData: GetProductType[];
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableProduct: React.Dispatch<React.SetStateAction<GetProductType>>;
}) => {
  const deleteProduct = async (id: any) => {
    try {
      const res = await instance.delete(`/deleteProduct/${id}`);

      if (res.status === 200) {
        console.log("Product successfully deleted");
      } else {
        console.warn("Unexpected status code:", res.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <>
      <div className="flex gap-5 h-12 items-center p-4">
        <div>
          <a
            className="font-normal hover:font-bold hover:underline hover:decoration-slice decoration-inherit"
            href=""
          >
            Бүтээгдэхүүн
          </a>
        </div>
        <div>
          <a
            className="font-normal hover:font-bold hover:underline hover:decoration-slice decoration-inherit"
            href=""
          >
            Ангилал
          </a>
        </div>
      </div>
      <div className="flex w-full">
        <div className="bg-[#ECEDF0] w-full">
          <div className="flex flex-col p-6 gap-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsAddProductVisible(true)}
                className="flex w-[280px] h-12 bg-black text-white rounded-lg items-center justify-center gap-3"
              >
                <span className="text-2xl">+</span>
                <span>Бүтээгдэхүүн нэмэх</span>
              </button>
            </div>
            <div className="flex flex-col">
              <div className="flex h-10 justify-between">
                <div className="flex gap-[13px]">
                  <div className="flex w-[145px]  bg-white rounded-lg gap-2 items-center p-1">
                    <IconCategory />
                    <select className="w-[100px]">
                      <option value="">Ангилал</option>
                      <option value="">Хувцас</option>
                      <option value="">Цахилгаан бараа</option>
                    </select>
                  </div>
                  <div className="flex w-[113px] h-10 bg-white rounded-lg gap-2 items-center p-1">
                    <IconDollar />
                    <select className="w-[70px]">
                      <option value="">Үнэ</option>
                      <option value="">10,000-50,000</option>
                      <option value="">51,000-100,000</option>
                      <option value="">101,000-150,000</option>
                    </select>
                  </div>
                  <div className="flex w-[145px] h-10 bg-white rounded-lg gap-2 items-center p-1">
                    <IconMonthly />
                    <select className="w-[100px]">
                      <option value="">Сараар</option>
                      <option value="">1 сараар</option>
                      <option value="">2 сараар</option>
                      <option value="">3 сараар</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 items-center bg-white w-[419px] p-2 rounded-lg">
                  <IconSearch />
                  <input
                    className="w-full"
                    type="search"
                    placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
                  />
                </div>
              </div>
              <div className="flex flex-col bg-white p-4 mt-4 rounded-lg">
                <div className="flex border-b-[1px] justify-between">
                  <div></div>
                  <div>
                    <p>Бүтээгдэхүүн</p>
                  </div>
                  <div>
                    <p>Ангилал</p>
                  </div>
                  <div>
                    <p>Үнэ</p>
                  </div>
                  <div>
                    <p>Үлдэгдэл</p>
                  </div>
                  <div>Зарагдсан</div>
                  <div>Нэмэгдсэн огноо</div>
                  <div></div>
                </div>
                <div className="flex flex-col">
                  {productData.map((product, i) => {
                    return (
                      <div className="w-full flex" key={i}>
                        <input type="checkbox" />
                        <p className="w-1/6">{product.name}</p>
                        <p className="w-1/6">
                          {product.categoryId.name}, {product.subCategoryName}
                        </p>
                        <p className="w-1/6">
                          {product.price.toLocaleString()}
                        </p>
                        <p className="w-1/6">{product.quantity}</p>
                        <p className="w-1/6">{product.quantity}</p>
                        <p className="w-1/6">{product.createdAt}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="w-4 h-4"
                          >
                            <Trash />
                          </button>
                          <button
                            onClick={() => {
                              setOnEdit(true),
                                setIsAddProductVisible(true),
                                setEditableProduct(product);
                            }}
                            className="w-4 h-4"
                          >
                            <Edit />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
