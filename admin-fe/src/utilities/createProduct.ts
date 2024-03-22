import { instance } from "@/instance";
import { Product } from "@/types/productType";
export const createProduct = async (
  values: Product,
  touched: any,
  errors: any,
  images: FileList | undefined,
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string,
  onEdit: boolean,
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setEditableProduct: any,
  oldImage: []
) => {
  if (
    (!onEdit &&
      (!touched.name ||
        !touched.price ||
        !touched.description ||
        !touched.productCode ||
        !touched.quantity ||
        !touched.tag)) ||
    errors.name ||
    errors.price ||
    errors.description ||
    errors.productCode ||
    errors.quantity ||
    errors.tag
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
    if (!onEdit) {
      if (!images) {
        return;
      }
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const res = await instance.post("/createProduct", formData);
      console.log("created");
      return res.status;
    } else {
      for (let i = 0; i < oldImage.length; i++) {
        formData.append("images", oldImage[i]);
      }
      const res = await instance.put("/editProduct", formData);
      setEditableProduct(null);
      setOnEdit(false);
      return res.status;
    }
  } catch (error) {
    console.error(error);
  }
};
