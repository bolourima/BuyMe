import { Product } from "@/components/Product";
import { SubCategory } from "@/components/SubCategory";
import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";
import { TypeSubCategory } from "@/types/subCategoryType";
import { categoryType } from "@/types/categoryType";
import { toastifyWarning } from "@/utilities/toastify";
import { useRouter } from "next/router";
import { getFavProducts } from "@/helper/getFavProducts";
import { ProductsInFavContext } from "@/context/ProductsInFavContext";
type Params = {
  category: string;
};
type Props = {
  productData: ProductType[];
};

const productList = ({
  productData,
  subCategoryBackendData,
  categoryData,
}: {
  categoryData: categoryType[];
  productData: ProductType[];
  subCategoryBackendData: TypeSubCategory[];
}) => {
  const router = useRouter();
  const { productsInFav, setProductsInFav } = useContext(ProductsInFavContext);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toastifyWarning("Please signin");
      router.push("/signin");
      return;
    }
    getFavProducts(accessToken, setProductsInFav);
  }, []);
  return (
    <div className="lg:w-full flex flex-col items-center">
      <div className="lg:flex lg:gap-5 ">
        <SubCategory
          subCategoryData={subCategoryBackendData}
          categoryData={categoryData}
        />
        <Product productData={productData} favProducts={productsInFav} />
      </div>
    </div>
  );
};
export default productList;
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  params
) => {
  const { category } = params.query;
  const productRes = await instance.get(`/getProducts/${category}`);
  const subCategoryRes = await instance.get(`/getSubCategorys/${category}`);
  const categoryRes = await instance.get(`/getCategories`);
  const productData = productRes.data;
  const subCategoryBackendData = subCategoryRes.data;
  const categoryData = categoryRes.data;

  return {
    props: { productData, subCategoryBackendData, categoryData },
  };
};
