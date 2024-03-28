import React, { useContext, useState } from "react";
import { ProductType } from "../types/productType";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Masonry from "./Masonry";
import Box from "@mui/material/Box";
export default function Product({
  productData,
}: {
  productData: ProductType[];
}) {
  const maxDatasToShow = 50;
  const [renderedDataindex, setDataIndex] = useState(0);
  const handleChangeBundling = () =>
    setDataIndex(renderedDataindex + maxDatasToShow);
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const setProductData: ClickHandler = (product: ProductType) => {
    putIntoBasket(product, productsInBasket, setProductsInBasket);
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
}
