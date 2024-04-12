"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const addressController_1 = require("../controllers/addressController");
const accessTokenAuth_1 = require("../middlewares/accessTokenAuth");
exports.addressRouter = (0, express_1.Router)();
exports.addressRouter.route("/address").post(accessTokenAuth_1.accessTokenAuth, addressController_1.newAddress);
