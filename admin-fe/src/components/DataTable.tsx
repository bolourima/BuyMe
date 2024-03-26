import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetProductType } from "@/types/getProductType";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", type: "string", width: 200 },
  { field: "name", headerName: "Бүтээгдэхүүн", width: 210 },
  {
    field: `categoryId`,
    headerName: "Ангилал",
    width: 130,
    valueGetter: (params) => {
      const { value, row } = params;
      const categoryName = value ? value.name : "";
      const brandName = row ? row.brandName : "";
      return `${categoryName} ${brandName}`;
    },
  },
  {
    field: "price",
    headerName: "Үнэ",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Үлдэгдэл",
    width: 130,
  },
  {
    field: "quantity",
    headerName: "Зарагдсан",
    width: 130,
  },
  {
    field: "updatedAt",
    headerName: "Өөрчилсөн огноо",
    width: 200,
  },
];

export default function DataTable({
  setIsAddProductVisible,
  productData,
  setOnEdit,
  setEditableProduct,
}: {
  setIsAddProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  productData: GetProductType[];
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableProduct: React.Dispatch<React.SetStateAction<GetProductType>>;
}) {
  return (
    <div>
      <button>Edit/Засах</button>

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
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(_id) => {
            console.log(_id);
          }}
        />
      </div>
    </div>
  );
}
