import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import { OrderType } from "@/types/orderType";
import { TablePagination } from "@mui/material";
import ChangeStatus from "./ChangeStatus";
type HandleStatusOpen = (id: string, status: string) => void;
function AdminRow({
  row,
  handleStatusOpen,
}: {
  row: OrderType;
  handleStatusOpen: HandleStatusOpen;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderNumber}
        </TableCell>
        <TableCell>{row.user.name}</TableCell>
        <TableCell>{row.total}</TableCell>
        <TableCell>
          {row.address?.district}-{row.address?.building}
        </TableCell>
        <TableCell align="right">
          <p
            onClick={() => handleStatusOpen(row._id, row.deliveryStatus)}
            className={`text-white p-2 rounded-lg text-center ${
              row.deliveryStatus === "PENDING" && "bg-blue-500"
            } ${row.deliveryStatus === "SHIPPED" && "bg-orange-500"} ${
              row.deliveryStatus === "DELIVERED" && "bg-green-500"
            }`}
          >
            {row.deliveryStatus}
          </p>
        </TableCell>
        <TableCell>
          <p
            className={`p-2 rounded-lg text-white text-center ${
              row.paymentStatus === "UNPAID" ? "bg-orange-500" : "bg-green-500"
            }`}
          >
            {row.paymentStatus}
          </p>
        </TableCell>
        <TableCell align="right">{row.createdAt.toString()}</TableCell>
        <TableCell align="right">{row.updatedAt.toString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Product
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Product Imgages</TableCell>
                    <TableCell>Shop Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productQTY) => (
                    <TableRow key={productQTY.product.name}>
                      <TableCell component="th" scope="row">
                        {productQTY.product.name}
                      </TableCell>
                      <TableCell>
                        <div>
                          <img
                            className="w-16 h-16"
                            src={productQTY.product.images[0]}
                            alt={productQTY.product.images[0]}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`shop/${productQTY.product.shopId._id}`}
                          className="text-green-500 "
                        >
                          {productQTY.product.shopId.shopName}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {productQTY.selectedProductQuantity}
                      </TableCell>
                      <TableCell align="right">
                        {productQTY.product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  orderDataForAdmin,
}: {
  orderDataForAdmin: OrderType[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };
  const shouldShowTableCell = orderDataForAdmin.length !== 0;
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const handleStatusOpen = (id: string, status: string) => {
    setOpenModal(true);
    setOrderId(id);
  };
  const handleStatusClose = () => {
    setOpenModal(false);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <TableContainer component={Paper}>
      <Typography className=" font-bold p-3" variant="h5" gutterBottom>
        Order List
      </Typography>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Number</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Totalprice</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Delivery Status</TableCell>
            <TableCell>Payment Status</TableCell>

            <TableCell align="right">Update Date</TableCell>

            <TableCell align="right">Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDataForAdmin.slice(startIndex, endIndex).map((order, index) => (
            <AdminRow
              key={index}
              row={order}
              handleStatusOpen={handleStatusOpen}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orderDataForAdmin.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ChangeStatus
        id={orderId}
        openModal={openModal}
        handleStatusClose={handleStatusClose}
      />
    </TableContainer>
  );
}
