import { Router } from "express";
import { newAddress } from "../controllers/addressController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

export const addressRouter = Router();
addressRouter.route("/address").post(accessTokenAuth, newAddress);
