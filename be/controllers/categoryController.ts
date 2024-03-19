import { Request, Response } from "express";
import Category from "../models/categoryModel";
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, subCategories } = req.body;
    const preventFromCoincidence = Category.findOne({ name: name });
    if (preventFromCoincidence === null) {
      return res.status(400).json({ message: "Coincide" });
    }
    const newCategory = await Category.create({
      name,
      subCategories,
    });
    return res.status(201).json({ msg: "successfully created" });
  } catch (error) {
    console.error("error in createCategory", error);
    return res.status(400).json({ msg: "Failed to create new catergory" });
  }
};
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (error) {
    console.error("error in getCategories", error);
    return res.status(400).json({ msg: "Failed to getCategories" });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleteableCategory = await Category.deleteOne({ _id: req.body._id });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("error in deleteCategory", error);
    return res.status(400).json({ message: "Failed to delete" });
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const editableCategory = await Category.updateOne(
      { _id: req.body.category._id },
      { name: req.body.newCategoryName }
    );
    if (editableCategory.matchedCount == 0) {
      return res.status(404).json({ message: "No category found" });
    }
    if (editableCategory.modifiedCount == 0) {
      return res.status(400).json({ message: "Failed to update" });
    }
    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.error("error in editCategory", error);
    return res.status(400).json({ msg: "Failed to eidt category", error });
  }
};
