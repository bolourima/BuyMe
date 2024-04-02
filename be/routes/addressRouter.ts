import { Router } from "express";
import { newAddress } from "../controllers/addressController";

export const addressRouter = Router();
addressRouter.route("/address").post(newAddress);
