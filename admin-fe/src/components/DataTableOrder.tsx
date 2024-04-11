import * as React from "react";
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
import { OrderType, productTypeForShop } from "@/types/orderType";
function AdminRow({ row }: { row: OrderType }) {
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
        <TableCell component="th" scope="row">
          {row.user.name}
        </TableCell>
        <TableCell>{row.total}</TableCell>
        <TableCell>{row.address.addressName}</TableCell>
        <TableCell align="right">
          <button>{row.deliveryStatus}</button>
        </TableCell>
        <TableCell align="right">{row.paymentStatus}</TableCell>
        <TableCell align="right">{row.createdAt.toString()}</TableCell>
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
                    <TableCell>Shop Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productQTY) => (
                    <TableRow key={productQTY.product.name}>
                      <TableCell component="th" scope="row">
                        {productQTY.product.shopId.shopName}
                      </TableCell>
                      <TableCell align="right">
                        {productQTY.product.quantity}
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
function Row({ row }: { row: productTypeForShop }) {
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
          {row[0].orderNumber}
        </TableCell>
        <TableCell component="th" scope="row">
          {row[0].user}
        </TableCell>
        <TableCell>{row[0].total}</TableCell>
        <TableCell align="right">{row[0].createdAt.toString()}</TableCell>
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
                    <TableCell>Shop Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row[0].product.map((productQTY) => (
                    <TableRow key={productQTY.name}>
                      <TableCell component="th" scope="row">
                        {productQTY.shopId.shopName}
                      </TableCell>
                      <TableCell align="right">{productQTY.quantity}</TableCell>
                      <TableCell align="right">{productQTY.price}</TableCell>
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
  orderData,
  orderDataForAdmin,
}: {
  orderData: productTypeForShop[];
  orderDataForAdmin: OrderType[];
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Number</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Totalprice</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Delivery Status</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Update Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.length != 0
            ? orderData.map((order) => <Row key={order[0].user} row={order} />)
            : orderDataForAdmin.map((order) => (
                <AdminRow key={order.user._id} row={order} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
