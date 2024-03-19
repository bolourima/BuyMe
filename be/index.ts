import express from "express";
import { connectToDB } from "./connectToDB";
import { categoryRouter } from "./routes/categoryRouter";
import { productRouter } from "./routes/productRouter";
import upload from "./middlewares/multer";
import { Request, Response } from "express";
import { createProduct } from "./controllers/productController";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", categoryRouter);
app.use("", productRouter);
connectToDB();

app.post(
  "/createProduct",
  upload.single("img1"),
  async (req: Request, res: Response) => {
    createProduct(req, res);
  }
);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
