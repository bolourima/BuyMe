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
import { basketRouter } from "./routes/basketRouter";
import { adminRouter } from "./routes/adminRouter";
import { addressRouter } from "./routes/addressRouter";
import { paymentRouter } from "./routes/paymentRouter";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(categoryRouter);
app.use(productRouter);
app.use(subCategoryRouter);
app.use(userRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(orderRouter);
app.use(basketRouter);
app.use(adminRouter);
app.use(addressRouter);
app.use(paymentRouter);
connectToDB();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
