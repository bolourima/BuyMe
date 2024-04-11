import { Request, Response } from "express";
import Product from "../models/productModel";

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const searchInput = req.body.input;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchInput, $options: "i" } },
        { brandName: { $regex: searchInput, $options: "i" } },
        { subCategoryName: { $regex: searchInput, $options: "i" } },
      ],
    });

    return res.status(200).send(products);
  } catch (error) {
    console.error("Error in searchProduct:", error);
    return res.status(400).send("Internal Server Error");
  }
};
export const filterSubCategory = async (req: Request, res: Response) => {
  try {
    const { inputValue, inputBrandName } = req.body;
    const products = await Product.find({
      $or: [{ price: { $gte: inputValue[0], $lte: inputValue[1] } }],
    });
    console.log(products);
    return res.status(200).send(products);
  } catch (error) {
    console.error("Error in filterSubCategory:", error);
    return res.status(400).send("Internal Server Error");
  }
};
