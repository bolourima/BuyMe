"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const addressController_1 = require("../controllers/addressController");
exports.addressRouter = (0, express_1.Router)();
exports.addressRouter.route("/address").post(addressController_1.newAddress);
