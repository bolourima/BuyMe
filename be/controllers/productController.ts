import { Request, Response } from "express";
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      categoryId,
      price,
      images,
      coupon,
      salePercent,
      description,
      createdAt,
    } = req.body;
    console.log(req.body);
    return res.status(201).json({ msg: "product created" });
  } catch (error) {
    console.error("error in createProduct", error);
  }
};
