import DeleteIcon from "@/icon/DeleteIcon";
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
    <div className="mt-0 flex flex-col w-full lg:flex lg:flex-col gap-6 lg:w-[700px]">
      {productsInBasket &&
        productsInBasket.toReversed().map((product, i) => {
          return (
            <div
              key={i}
              className="w-full shadow-lg bg-[#FBFBFB] rounded-xl flex justify-between lg:flex lg:flex-row gap-2 h-[235px] "
            >
              <div className="w-2/5 flex justify-center items-center ml-4">
                <img
                  src={product.product?.images[0]}
                  className="h-[190px] rounded-md"
                />
              </div>
              <div className="lg:flex flex-col py-8 ml-5 justify-between w-2/5 h-full">
                <div>
                  <div className="flex gap-4 mb-3">
                    <p className="text-xl font-sans font-semibold">
                      {product.product?.name}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      {product.product?.disCount.isSale ? (
                        <p>
                          <p className="line-through text-xl font-sans text-red-700 ">
                            {product.product?.price.toLocaleString()} ₮
                          </p>
                          <p className="text-xl font-sans text-green-500">
                            {(
                              product.product.price *
                              ((100 - product.product.disCount.salePercent) /
                                100)
                            ).toLocaleString()}
                            ₮
                          </p>
                        </p>
                      ) : (
                        <p className="text-xl font-sans text-green-500">
                          {product.product?.price.toLocaleString()} ₮
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 rounded-lg">
                  <button
                    onClick={() => {
                      clickMinus(product);
                    }}
                    className="h-10 w-10 rounded-lg bg-black text-white flex justify-center items-center hover:bg-gray-400 hover:text-black hover:font-bold"
                  >
                    -
                  </button>
                  <p className="h-15 flex justify-center items-center text-lg font-sans">
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
                    className="h-10 w-10 rounded-lg bg-black text-white flex justify-center items-center hover:bg-gray-400 hover:text-black hover:font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-start p-6">
                <button
                  onClick={() =>
                    removeFromBasket(
                      product.product?._id,
                      productsInBasket,
                      setProductsInBasket,
                      token
                    )
                  }
                  className=""
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
