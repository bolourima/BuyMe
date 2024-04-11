import { productTypeForShop } from "@/types/orderType";

export const calculateTotal = (order: productTypeForShop[]) => {
  return order.reduce((acc, cur) => {
    return (
      acc +
      ((cur[0].product.price * (100 - cur[0].product.disCount.salePercent)) /
        100) *
        cur[0].selectedProductQuantity
    );
  }, 0);
};
