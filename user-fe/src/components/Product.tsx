import React, { useContext, useEffect, useState } from "react";
import { ProductType } from "../types/productType";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import ImageList from "@mui/material/ImageList";
import { Masonry } from "./Masonry";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { instance } from "@/instance";
import { SearchInputContext } from "@/context/searchContext";

export const Product = ({
  productData,
  favProducts,
}: {
  productData: ProductType[];
  favProducts: ProductType[];
}) => {
  const [token, setToken] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const page: number[] = [];
  const [qtyOfProducts, setQtyOfProducts] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const { searchedProduct, setSearchedProduct } =
    useContext(SearchInputContext);
  const getProducts = async () => {
    try {
      setSearchedProduct([]);
      const productRes = await instance.get(`/getAllProducts/${selectedPage}`);
      setProducts(productRes.data);
    } catch (error) {
      console.error("error in get products", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [selectedPage]);
  const getQuantityOfProducts = async () => {
    const res = await instance.get("/getQuantityOfProducts");
    setQtyOfProducts(res.data.qty);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setToken(token);
    getQuantityOfProducts();
  }, [qtyOfProducts]);
  for (let i = 0; i < Math.ceil(qtyOfProducts / 10); i++) {
    page.push(i);
  }
  const setProductData: ClickHandler = (
    product: ProductType,
    onDouble: boolean
  ) => {
    putIntoBasket(product, token);
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
    } else {
      return 4;
    }
  };
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="xl:w-full flex flex-col justify-between items-center h-full">
        <Box sx={{ overflowY: "scroll" }}>
          <ImageList variant="masonry" cols={getCols()} gap={24}>
            {searchedProduct.length == 0
              ? (productData.length == 0 ? products : productData).map(
                  (Data, i) => {
                    const favs = favProducts.filter((prod) => {
                      return prod._id === Data._id;
                    });
                    const isFav = favs.length == 0 ? false : true;
                    return (
                      <Masonry
                        key={i}
                        data={Data}
                        setProductData={setProductData}
                        isFav={isFav}
                      />
                    );
                  }
                )
              : searchedProduct.map((Data, i) => {
                  const favs = favProducts.filter((prod) => {
                    return prod._id === Data._id;
                  });
                  const isFav = favs.length == 0 ? false : true;
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
        {productData.length == 0 && (
          <div className="flex w-full justify-center gap-8 mt-8">
            {page.map((el) => {
              return (
                <button
                  onClick={() => setSelectedPage(el)}
                  className={`w-8 h-8 border-[1px] border-solid border-black ${
                    el == selectedPage && "text-white bg-black"
                  } rounded-lg`}
                >
                  {el + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
