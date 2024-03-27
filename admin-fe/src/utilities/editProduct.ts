import { instance } from "@/instance";
import { Product } from "@/types/productType";

export const editProduct = async (
  _id: string,
  values: Product,
  images: File[],
  oldImages: string[],
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string,
  setEditableProduct: any,
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
  if (images?.length && oldImages.length) {
    const product = { ...newProduct, _id: _id, images: oldImages };
    formData.append("product", JSON.stringify(product));
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    const res = await instance.put("/editProduct", formData);
    return res.status;
  }
  if (images?.length) {
    const product = { ...newProduct, _id: _id };
    formData.append("product", JSON.stringify(product));
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    const res = await instance.put("/editProduct", formData);
    return res.status;
  } else {
    const editedProduct: any = {
      ...newProduct,
      images: oldImages,
      _id: _id,
    };
    const res = await instance.put("/editProduct", editedProduct);
    setEditableProduct(null);
    setOnEdit(false);
    return res.status;
  }
};
