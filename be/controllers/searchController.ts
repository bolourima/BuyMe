import { Request, Response } from "express";
import Product from "../models/productModel";

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const searchInput = req.body.searchInput;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchInput, $options: "i" } },
        { description: { $regex: searchInput, $options: "i" } },
        { brandName: { $regex: searchInput, $options: "i" } },
        { subCategoryName: { $regex: searchInput, $options: "i" } },
      ],
    });

    return res.status(200).send(products);
  } catch (error) {
    console.error("Error in searchProduct:", error);
    return res.status(500).send("Internal Server Error");
  }
};
