import React, { useContext, useEffect, useState } from "react";
import { ProductType } from "../types/productType";
import { ProductsInBasketContext } from "@/context/ProductsInCartContext";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import ImageList from "@mui/material/ImageList";

import { Masonry } from "./Masonry";
import Box from "@mui/material/Box";

export const Product = ({
  productData,
  favProducts,
}: {
  productData: ProductType[];
  favProducts: ProductType[];
}) => {
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
    product: ProductType,
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
            {productData.map((Data, i) => {
              const test = favProducts.filter((prod) => {
                return prod._id === Data._id;
              });
              const isFav = test.length == 0 ? false : true;
              return (
                <Masonry
                  key={i}
                  data={Data}
                  setProductData={setProductData}
                  isFav={isFav}
                />
              );
            })}
          </ImageList>
        </Box>
      </div>
      {/* <button onChange={handleChangeBundling}>next page</button> */}
    </div>
  );
};
