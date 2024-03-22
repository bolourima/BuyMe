"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToDB_1 = require("./connectToDB");
const categoryRouter_1 = require("./routes/categoryRouter");
const productRouter_1 = require("./routes/productRouter");
const multer_1 = __importDefault(require("./middlewares/multer"));
const productController_1 = require("./controllers/productController");
const subCategoryRouter_1 = require("./routes/subCategoryRouter");
const cors_1 = __importDefault(require("cors"));
const subCategoryController_1 = require("./controllers/subCategoryController");
const userRouter_1 = require("./routes/userRouter");
const signInRouter_1 = require("./routes/signInRouter");
const signUpRouter_1 = require("./routes/signUpRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(
  (0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("", categoryRouter_1.categoryRouter);
app.use("", productRouter_1.productRouter);
app.use("", subCategoryRouter_1.subCategoryRouter);
app.use(userRouter_1.userRouter);
app.use("", signInRouter_1.signInRouter);
app.use("", signUpRouter_1.signUpRouter);
// app.use(authRouter);
(0, connectToDB_1.connectToDB)();
app.post("/createProduct", multer_1.default.array("images"), (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    (0, productController_1.createProduct)(req, res);
  })
);
app.put("/editSub", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    (0, subCategoryController_1.editSubCategories)(req, res);
  })
);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
