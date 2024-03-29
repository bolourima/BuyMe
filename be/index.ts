import express from "express";
import { connectToDB } from "./connectToDB";
import { categoryRouter } from "./routes/categoryRouter";
import { productRouter } from "./routes/productRouter";
import { subCategoryRouter } from "./routes/subCategoryRouter";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { signInRouter } from "./routes/signInRouter";
import { signUpRouter } from "./routes/signUpRouter";
import { orderRouter } from "./routes/orderRouter";
import { Request, Response } from "express";
import upload from "./middlewares/multer";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use("", categoryRouter);
app.use("", productRouter);
app.use("", subCategoryRouter);
app.use(userRouter);
app.use("", signInRouter);
app.use("", signUpRouter);
app.use(orderRouter);

connectToDB();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
