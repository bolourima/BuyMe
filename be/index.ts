import express from "express";
import { connectToDB } from "./connectToDB";
import { categoryRouter } from "./routes/categoryRouter";
import { productRouter } from "./routes/productRouter";
import upload from "./middlewares/multer";
import { Request, Response } from "express";
import { createProduct, editProduct } from "./controllers/productController";
import { subCategoryRouter } from "./routes/subCategoryRouter";
import cors from "cors";
import { editSubCategories } from "./controllers/subCategoryController";
import { userRouter } from "./routes/userRouter";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("", categoryRouter);
app.use("", productRouter);
app.use("", subCategoryRouter);
app.use(userRouter);

connectToDB();
app.post(
  "/createProduct",
  upload.array("images"),
  async (req: Request, res: Response) => {
    createProduct(req, res);
  }
);
app.put(
  "/editProduct",
  upload.array("images"),
  async (req: Request, res: Response) => {
    editProduct(req, res);
  }
);
app.put("/editSub", async (req: Request, res: Response) => {
  editSubCategories(req, res);
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
