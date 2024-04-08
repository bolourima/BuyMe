import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetProductType } from "@/types/getProductType";
import { instance } from "@/instance";
import { Trash } from "@/svg/Trash";
import { idType } from "@/types/idType";
import { toastifySuccess, toastifyWarning } from "@/utilities/toastify";
import { Edit } from "@/svg/Edit";

const DataTable = ({
  productData,
  token,
  setIsAddProductVisible,
  setEditableProduct,
  setOnEdit,
}: {
  setEditableProduct: React.Dispatch<React.SetStateAction<GetProductType>>;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  productData: GetProductType[];
  token: string;
}) => {
  const handleDelete = async (id: idType) => {
    try {
      const res = await instance.delete(`/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
      if (res.status === 200) {
        toastifySuccess("Product successfully deleted");
      } else {
        toastifyWarning("Unexpected error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toastifyWarning("Unexpected error");
    }
  };

  const handleEdit = (product: GetProductType) => {
    setOnEdit(true), setIsAddProductVisible(true), setEditableProduct(product);
  };

  const columns: GridColDef[] = [
    {
      field: "images",
      headerName: "Зураг",
      width: 100,
      renderCell: (params) => {
        const image =
          params.value && params.value.length > 0 ? params.value[0] : null;
        return image ? (
          <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
        ) : null;
      },
    },
    { field: "name", headerName: "Бүтээгдэхүүн", width: 210 },
    {
      field: `categoryId`,
      headerName: "Ангилал",
      width: 130,
      valueGetter: (params) => {
        const { _id, name } = params;
        const categoryName = name ? name : "";
        return `${categoryName}`;
      },
    },
    { field: "price", headerName: "Үнэ", width: 100 },
    { field: "quantity", headerName: "Үлдэгдэл", width: 130 },
    { field: "quantity", headerName: "Зарагдсан", width: 130 },
    { field: "updatedAt", headerName: "Өөрчилсөн огноо", width: 200 },
    {
      field: "Action",
      headerName: "Үйлдэл",
      width: 100,
      renderCell: (params) => {
        const rowId = params.row._id;
        const product = params.row as GetProductType;
        return (
          <div className="flex gap-3 items-center p-1">
            <div onClick={() => handleDelete(rowId)} className="w-4 h-6">
              <Trash />
            </div>
            <div className="w-4 h-6" onClick={() => handleEdit(product)}>
              <Edit />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="p-3 ">Бүтээгдэхүүн</div>
      <div className="flex items-center">
        <button
          onClick={() => setIsAddProductVisible(true)}
          className="flex w-[280px] h-12 bg-black text-white rounded-lg items-center justify-center gap-3"
        >
          <span className="text-2xl">+</span>
          <span>Бүтээгдэхүүн нэмэх</span>
        </button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={productData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          onRowSelectionModelChange={(_id) => {}}
        />
      </div>
    </div>
  );
};

export default DataTable;
