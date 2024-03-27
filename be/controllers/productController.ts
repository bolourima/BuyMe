import { Request, Response } from "express";
import cloudinary from "../utilities/Cloudinary";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import test from "node:test";
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("categoryId");
    return res.status(200).send(products);
  } catch (error) {
    console.error("error in getProducts", "PRODUCT ERRER", error);
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
export const editProduct = async (req: Request, res: Response) => {
  try {
    const date =
      `${new Date().getFullYear()}` +
      "/" +
      `${new Date().getMonth() + 1}` +
      "/" +
      `${new Date().getDate()}`;
    if (req.body.product.images?.length && req.files?.length) {
      const productWithNewImages = JSON.parse(req.body.product);
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
        _id,
        images,
      } = productWithNewImages;
      const newImages: any = req.files;
      let urlContainer: String[] = [];
      for (let i = 0; i < newImages?.length; i++) {
        const url: any = await uploadImg(newImages[i]);
        urlContainer.push(url);
      }
      urlContainer = [...urlContainer, ...images];
      const selectedCategory = await Category.findOne({ name: categoryName });
      const product = await Product.findOneAndUpdate(
        { _id: _id },
        {
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
          _id,
          updatedAt: date,
        }
      );
      return res.status(200).json({ msg: "Updated" });
    }
    if (req.body.product) {
      const productWithNewImages = JSON.parse(req.body.product);
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
        _id,
      } = productWithNewImages;
      const images: any = req.files;
      const urlContainer: String[] = [];
      for (let i = 0; i < images?.length; i++) {
        const url: any = await uploadImg(images[i]);
        urlContainer.push(url);
      }
      const selectedCategory = await Category.findOne({ name: categoryName });
      const product = await Product.findOneAndUpdate(
        { _id: _id },
        {
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
          _id,
          updatedAt: date,
        }
      );
      return res.status(200).json({ msg: "Updated" });
    } else {
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
        images,
        _id,
      } = req.body;
      const selectedCategory = await Category.findOne({ name: categoryName });
      const product = await Product.findByIdAndUpdate(
        { _id: _id },
        {
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
          images,
          updatedAt: date,
        }
      );
    }
    return res.status(200).json({ msg: "Updated" });
  } catch (error) {
    console.error("error in edit product", error);
    return res.status(400).json({ msg: "Failed to update" });
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
