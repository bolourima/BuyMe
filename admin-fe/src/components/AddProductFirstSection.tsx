import React from "react";

export const AddProductFirstSection = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
}: any) => {
  return (
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
  );
};
