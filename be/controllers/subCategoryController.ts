import { Request, Response } from "express";
import SubCategory from "../models/subCategoryModel";
import Category from "../models/categoryModel";
type CategoryType = {
  _id: string;
  name: string;
  _v: number;
};
type SubCategoryType = {
  _id: string;
  name: string;
  category: CategoryType;
};
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const newSubCateogory = await SubCategory.create({
      name: req.body.name,
      category: req.body.categoryId,
      brands: req.body.brands,
    });
    return res.status(201).json({ msg: "Sub category created" });
  } catch (error) {
    console.error("error in createsubCategory", error);
    return res.status(400).json({ msg: "failed to create sub category" });
  }
};
export const postSubCategories = async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    const subCategories: SubCategoryType[] = await SubCategory.find().populate(
      "category"
    );
    const subs = subCategories.filter((el) => {
      return el.category.name === name;
    });
    return res.status(200).send(subs);
  } catch (error) {
    console.error(error);
    return res.status(400).send("failed");
  }
};
export const editSubCategories = async (req: Request, res: Response) => {
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  const brandId = guidGenerator();

  const { subName, brandName } = req.body;
  const selectedSub = await SubCategory.findOneAndDelete({ name: subName });
  const brand = [{ name: brandName, _id: brandId }];
  const sub = await SubCategory.create({
    _id: selectedSub?._id,
    name: subName,
    category: selectedSub?.category,
    brands: brand,
  });
  return res.status(200).send("success");
};
export const getSubCategory = async (req: Request, res: Response) => {
  try {
    const name = req.params.category;
    const filteredCategory = await Category.find({ name });
      const category = filteredCategory[0]._id;
    const subCategories = await SubCategory.find({category}).populate(
      "category"
    );

    return res.status(200).send(subCategories);
  } catch (error) {
    console.error(error);
    return res.status(400).send("failed");
  }
};
export const getSubCategories = async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    const subCategories = await SubCategory.find().populate(
      "category"
    );
    return res.status(200).send(subCategories);
  } catch (error) {
    console.error(error);
    return res.status(400).send("failed");
  }
};
