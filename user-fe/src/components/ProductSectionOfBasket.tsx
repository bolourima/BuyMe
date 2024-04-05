import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { changeProductQuantity } from "@/utilities/countChange";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import { toastifyError } from "@/utilities/toastify";

export const ProductSectionOfBasket = ({
  productsInBasket,
  setProductsInBasket,
  token,
}: {
  productsInBasket: ProductTypeWithQuantity[];
  setProductsInBasket: React.Dispatch<
    React.SetStateAction<ProductTypeWithQuantity[]>
  >;
  token: string;
}) => {
  const clickMinus = async (product: ProductTypeWithQuantity) => {
    try {
      if (product.selectedProductQuantity == 1) {
        removeFromBasket(
          product.product._id,
          productsInBasket,
          setProductsInBasket,
          token
        );
      } else {
        changeProductQuantity(
          product,
          false,
          productsInBasket,
          setProductsInBasket,
          token
        );
      }
    } catch (error) {
      toastifyError("Failed to reduce product quantity.");
    }
  };
  return (
    <div className=" flex flex-col w-full lg:flex lg:flex-col gap-6 lg:w-[900px]">
      {productsInBasket &&
        productsInBasket.map((product, i) => {
          return (
            <div
              key={i}
              className=" flex flex-col lg:flex lg:flex-row gap-2 w-full h-[300px] items-center px-4 my-4"
            >
              <img src={product.product?.images[0]} className="w-1/2 h-full" />
              <div className="lg:flex flex-col w-1/2 pl-4 h-full">
                <p>Name: {product.product?.name}</p>
                <p>Category: {product.product?.categoryId.name}</p>
                <p>SubCategory: {product.product?.subCategoryName}</p>
                <p>Brand: {product.product?.brandName}</p>
                <div>
                  Price:
                  {product.product?.disCount.isSale ? (
                    <p>
                      <p className="line-through">
                        {product.product?.price.toLocaleString()}
                      </p>
                      {(
                        product.product.price *
                        ((100 - product.product.disCount.salePercent) / 100)
                      ).toLocaleString()}
                      ₮
                    </p>
                  ) : (
                    product.product?.price.toLocaleString()
                  )}
                </div>
                <p>
                  Discount:
                  {product.product?.disCount.isSale
                    ? "   " + product.product?.disCount.salePercent + "%"
                    : "   Хямдралгүй"}
                </p>
                <p>Tags: {product.product?.tag}</p>
                <div className="w-full h-fit justify-between flex my-4">
                  <button
                    onClick={() => {
                      clickMinus(product);
                    }}
                    className="w-1/6 h-12 rounded-lg bg-black text-white flex justify-center items-center"
                  >
                    -
                  </button>
                  <p className="h-15 w-fit flex justify-center items-center">
                    {product.selectedProductQuantity}
                  </p>
                  <button
                    onClick={() =>
                      changeProductQuantity(
                        product,
                        true,
                        productsInBasket,
                        setProductsInBasket,
                        token
                      )
                    }
                    className="w-1/6 h-12 rounded-lg bg-black text-white flex justify-center items-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    removeFromBasket(
                      product.product?._id,
                      productsInBasket,
                      setProductsInBasket,
                      token
                    )
                  }
                  className="w-full bg-black h-12 rounded-lg text-white flex justify-center items-center"
                >
                  Delete from basket
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
