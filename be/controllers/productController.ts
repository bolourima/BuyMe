import { Request, Response } from "express";
import cloudinary from "../utilities/Cloudinary";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.status(200).send(products);
  } catch (error) {
    console.error("error in getProducts", error);
    return res.status(400).send("Failed to getProducts");
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      productCode,
      quantity,
      tag,
      disCount,
      categoryName,
      subCategoryName,
      brandName,
    } = JSON.parse(req.body.product);
    const images: any = req.files;
    const urlContainer: String[] = [];
    for (let i = 0; i < images?.length; i++) {
      const url: any = await uploadImg(images[i]);
      urlContainer.push(url);
    }
    const selectedCategory = await Category.findOne({
      name: categoryName,
    });
    const date =
      `${new Date().getFullYear()}` +
      "/" +
      `${new Date().getMonth() + 1}` +
      "/" +
      `${new Date().getDate()}`;
    const newProduct = await Product.create({
      name,
      description,
      price,
      productCode,
      quantity,
      tag,
      disCount,
      categoryId: selectedCategory?._id,
      subCategoryName,
      brandName,
      images: urlContainer,
      createdAt: date,
      updatedAt: date,
    });
    console.log(newProduct);
    return res.status(201).json({ msg: "product created" });
  } catch (error) {
    console.error("error in createProduct", error);
  }
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
