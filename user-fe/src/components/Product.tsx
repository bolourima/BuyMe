import React, { useContext, useEffect, useState } from "react";
import { ProductType } from "../types/productType";
import { ProductsInBasketContext } from "@/context/ProductsInCartContext";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import ImageList from "@mui/material/ImageList";
import { Masonry } from "./Masonry";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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

  const getCols = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

    if (isSmallScreen) {
      return 1;
    } else if (isMediumScreen) {
      return 3;
    } else if (isLargeScreen) {
      return 4;
    } else {
      return 4;
    }
  };
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="xl:w-full">
        <Box sx={{ overflowY: "scroll" }}>
          <ImageList variant="masonry" cols={getCols()} gap={24}>
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
    </div>
  );
};
