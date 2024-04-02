import { Request, Response } from "express";
import Basket from "../models/basketModel";
import Product from "../models/productModel";
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const editBasket = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const selectedBasket = await Basket.findOne({ user: req.user.id });
    const newProduct = await Product.findById(req.params.id);
    if (!newProduct || !selectedBasket?.products) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const checkCoincidence = selectedBasket?.products.filter((product) => {
      return product.product?.productCode === newProduct.productCode;
    });
    if (checkCoincidence?.length == 0) {
      const product = {
        product: newProduct,
        selectedProductQuantity: req.body.onDouble ? 2 : 1,
      };
      const result = await Basket.findOneAndUpdate(
        { user: req.user.id },
        { $push: { products: product } },
        { new: true }
      );
      return res.status(200).json({ msg: "updated" });
    } else {
      const index = selectedBasket?.products.findIndex((el) => {
        return el.product?.productCode === newProduct.productCode;
      });
      const number = selectedBasket.products[index].selectedProductQuantity;
      if (number === null || number === undefined) return;
      if (req.body?.type !== false || !req.body) {
        selectedBasket.products[index].selectedProductQuantity = number + 1;
      } else {
        selectedBasket.products[index].selectedProductQuantity = number - 1;
      }
      await selectedBasket.save();
      return res.status(200).send("Updated");
    }
  } catch (error) {
    console.error("error in editbasket", error);
    return res.status(400).json({ msg: "Failed to edit basket" });
  }
};

export const getBasketById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const basket = await Basket.findOne({ user: req.user.id }).populate(
      "products"
    );
    return res.status(200).send(basket);
  } catch (error) {
    console.error("error in getbasketdata", error);
    return res.status(400).json({ msg: "Failed to get basket" });
  }
};
export const deleteProductFromBasket = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const product = await Product.findById(req.params.id);
    await Basket.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: { products: { product: product } },
      }
    );
    return res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    console.error("error in deleteProductfrombasket", error);
    return res.status(400).json({ msg: "Failed to delete" });
  }
};
