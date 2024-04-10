import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetProductType } from "@/types/getProductType";
import { instance } from "@/instance";
import { Trash } from "@/svg/Trash";
import { Edit } from "@/svg/Edit";
import { toastifySuccess, toastifyWarning } from "@/utilities/toastify";

const DataTable = ({
  productRawData,
  token,
  setIsAddProductVisible,
  setEditableProduct,
  setOnEdit,
}: {
  productRawData: GetProductType[];
  token: string;
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableProduct: React.Dispatch<React.SetStateAction<GetProductType>>;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [productData, setProductData] = useState<GetProductType[]>(
    productRawData.length != 0 ? productRawData : []
  );

  const [filterText, setFilterText] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      await instance.delete(`/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedProducts = productData.filter(
        (product) => product._id !== id
      );
      toastifySuccess("Product successfully deleted");
      setProductData(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
      toastifyWarning("Unexpected error");
    }
  };

  const handleEdit = (product: GetProductType) => {
    setIsAddProductVisible(true);
    setOnEdit(true);
    setEditableProduct(product);
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
  useEffect(() => {
    setProductData(productRawData);
  }, [productRawData]);
  const filteredProductData = productData.filter((product) => {
    const productValues = Object.values(product).join("").toLowerCase();
    return productValues.includes(filterText.toLowerCase());
  });

  return (
    <div>
      <div className="flex items-center pt-3">
        <input
          type="text"
          placeholder="Хайх..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-[280px] h-12 bg-white rounded-lg items-center justify-center gap-3 mb-5"
        />
        <button
          onClick={() => setIsAddProductVisible(true)}
          className="flex w-[280px] h-12 bg-black text-white rounded-lg items-center justify-center gap-3 mb-5"
        >
          <span className="text-2xl">+</span>
          <span>Бүтээгдэхүүн нэмэх</span>
        </button>
      </div>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          disableColumnSelector
          rows={filteredProductData}
          columns={columns}
          pageSizeOptions={[10, 15]}
          disableRowSelectionOnClick
          onRowSelectionModelChange={() => {}}
        />
      </div>
    </div>
  );
};

export default DataTable;
