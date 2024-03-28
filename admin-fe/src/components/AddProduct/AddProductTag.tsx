import React from "react";

export const AddProductTag = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
}: any) => {
  return (
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
  );
};
