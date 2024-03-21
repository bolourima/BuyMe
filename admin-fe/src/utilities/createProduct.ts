import { instance } from "@/instance";
import { Product } from "@/types/productType";
export const createProduct = async (
  e: React.FormEvent<HTMLFormElement>,
  values: Product,
  touched: any,
  errors: any,
  images: FileList | undefined,
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string
) => {
  e.preventDefault();
  if (!images) return;
  if (
    !touched.name ||
    !touched.price ||
    !touched.description ||
    !touched.productCode ||
    !touched.quantity ||
    !touched.tag ||
    errors.name ||
    errors.price ||
    errors.description ||
    errors.productCode ||
    errors.quantity ||
    errors.tag ||
    images?.length < 0
  ) {
    return;
  }
  try {
    const disCount = { isSale: isSale, salePercent: salePercent };
    const newProduct = {
      name: values.name,
      description: values.description,
      price: values.price,
      productCode: values.productCode,
      quantity: values.quantity,
      tag: values.tag,
      disCount: disCount,
      categoryName: selectedCategory,
      subCategoryName: subName,
      brandName: selectedBrand,
    };
    const formData = new FormData();
    formData.append("product", JSON.stringify(newProduct));
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    const res = await instance.post("/createProduct", formData);
    return res.status;
  } catch (error) {
    console.error(error);
  }
};
