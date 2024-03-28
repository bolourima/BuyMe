import { Request, Response } from "express";
import cloudinary from "../utilities/Cloudinary";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("categoryId");
    return res.status(200).send(products);
  } catch (error) {
    console.error("error in getProducts", "PRODUCT ERRER", error);
    return res.status(400).send("Failed to getProducts");
  }
};
export const uploadSingleImage = async (req: Request, res: Response) => {
  try {
    const url = await uploadImg(req.file);
    return res.status(201).json({ img: url });
  } catch (error) {
    console.error("error in upload single image", error);
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const checkCoindence = await Product.findOne({
      productCode: req.body.productCode,
    });
    if (checkCoindence) return res.status(403).send("Product code coincided");
    const selectedCategory = await Category.findOne({
      name: req.body.categoryName,
    });
    if (!selectedCategory) return res.status(400).json({ msg: "No category" });
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      productCode: req.body.productCode,
      quantity: req.body.quantity,
      tag: req.body.tag,
      disCount: req.body.disCount,
      categoryId: selectedCategory._id,
      subCategoryName: req.body.subCategoryName,
      brandName: req.body.brandName,
      images: req.body.images,
      createdAt: getDateByString(),
      updatedAt: getDateByString(),
    });
    return res.status(201).json({ msg: "product created" });
  } catch (error) {
    console.error("error in createProduct", error);
    return res.status(400).json({ msg: "Failed to create" });
  }
};
export const editProduct = async (req: Request, res: Response) => {
  try {
    const selectedCategory = await Category.findOne({
      name: req.body.categoryName,
    });
    if (!selectedCategory) return res.status(400).json({ msg: "No category" });
    const newProduct = await Product.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      productCode: req.body.productCode,
      quantity: req.body.quantity,
      tag: req.body.tag,
      disCount: req.body.disCount,
      categoryId: selectedCategory._id,
      subCategoryName: req.body.subCategoryName,
      brandName: req.body.brandName,
      images: req.body.images,
      createdAt: getDateByString(),
      updatedAt: getDateByString(),
    });
    return res.status(200).json({ msg: "Updated" });
  } catch (error) {
    console.error("error in edit product", error);
    return res.status(400).json({ msg: "Failed to update" });
  }
};
const getDateByString = () => {
  const date =
    `${new Date().getFullYear()}` +
    "/" +
    `${new Date().getMonth() + 1}` +
    "/" +
    `${new Date().getDate()}`;
  return date;
};
const uploadImg = async (img: any) => {
  try {
    const uploadedFile = img;
    if (!uploadedFile) {
      return false;
    }
    try {
      const newImage = await cloudinary.uploader.upload(uploadedFile.path);
      const image = new Product({ img: newImage.secure_url });
      return newImage.secure_url;
    } catch (error) {
      console.error(error);
      return false;
    }
  } catch (error) {
    console.error("error in uploadImg", error);
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletableId = req.params.id;
    const deleting = await Product.findByIdAndDelete(deletableId);
    return res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    console.error("error in deleteProduct", error);
    return res.status(400).json({ msg: "Failed to delete" });
  }
};
// export const getProductDetail = async (req: Request, res: Response) => {
//   try {
//     const productId = req.params._id;
//     const product = await Product.findById(productId).populate("categoryId");
//     return res.status(200).send(product);
//   } catch (error) {
//     console.error("error in getProducts", "PRODUCT ERRER", error);
//     return res.status(400).send("Failed to getProducts");
//   }
// };
