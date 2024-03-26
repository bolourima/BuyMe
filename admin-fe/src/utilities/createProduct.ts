import { instance } from "@/instance";
import { Product } from "@/types/productType";
export const createProduct = async (
  _id: string,
  values: Product,
  touched: any,
  errors: any,
  images: File[],
  isSale: boolean,
  salePercent: any,
  selectedCategory: string,
  subName: string,
  selectedBrand: string,
  onEdit: boolean,
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setEditableProduct: any,
  oldImage: string[]
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
    if (!onEdit) {
      formData.append("product", JSON.stringify(newProduct));
      if (!images) {
        return;
      }
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const res = await instance.post("/createProduct", formData);
      return res.status;
    } else {
      if (images?.length && oldImage.length) {
        const product = { ...newProduct, _id: _id, images: oldImage };
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
        console.log(res);
        return res.status;
      } else {
        const editedProduct: any = {
          ...newProduct,
          images: oldImage,
          _id: _id,
        };
        const res = await instance.put("/editProduct", editedProduct);
        setEditableProduct(null);
        setOnEdit(false);
        return res.status;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
