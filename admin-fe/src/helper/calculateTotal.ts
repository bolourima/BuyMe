import { productTypeForShop } from "@/types/orderType";

export const calculateTotal = (order: productTypeForShop) => {
  return order.reduce((acc, cur) => {
    return (
      acc +
      ((cur.product.price * (100 - cur.product.disCount.salePercent)) / 100) *
        cur.selectedProductQuantity
    );
  }, 0);
};
