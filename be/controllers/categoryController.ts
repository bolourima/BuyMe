import { Request, Response } from "express";
import Category from "../models/categoryModel";
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (error) {
    console.error("error in getCategories", error);
    return res.status(400).json({ msg: "Failed to getCategories" });
  }
};
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    return res.status(201).json({ msg: "Category successfully created" });
  } catch (error) {
    console.error("error in createCategory", error);
    return res.status(400).json({ msg: "Failed to create category" });
  }
};
