import React, { useContext, useEffect, useState } from "react";
import { ProductType } from "../types/productType";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Masonry } from "./Masonry";
import Box from "@mui/material/Box";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
export const Product = ({ productData }: { productData: ProductType[] }) => {
  const [token, setToken] = useState("");
  const maxDatasToShow = 50;
  const [renderedDataindex, setDataIndex] = useState(0);
  const handleChangeBundling = () =>
    setDataIndex(renderedDataindex + maxDatasToShow);
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setToken(token);
  }, []);
  const setProductData: ClickHandler = (
    product: ProductTypeWithQuantity,
    onDouble: boolean
  ) => {
    putIntoBasket(
      product,
      productsInBasket,
      setProductsInBasket,
      token,
      onDouble
    );
  };
  return (
    <div>
      <div>
        <Box sx={{ width: 1000, height: 1000, overflowY: "scroll" }}>
          <ImageList variant="masonry" cols={3} gap={24}>
            {productData.map((Data, i) => (
              <Masonry key={i} data={Data} setProductData={setProductData} />
            ))}
          </ImageList>
        </Box>
      </div>
      {/* <button onChange={handleChangeBundling}>next page</button> */}
    </div>
  );
};
