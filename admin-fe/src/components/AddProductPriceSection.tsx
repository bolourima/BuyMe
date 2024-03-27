import React from "react";

export const AddProductPriceSection = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
}: any) => {
  return (
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
  );
};
