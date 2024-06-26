"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDeliveryStatusOfStatus = exports.changeOrderInvoice = exports.getOrdersOfUser = exports.getSelectedOrders = exports.getOrdersInAdmin = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const basketModel_1 = __importDefault(require("../models/basketModel"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel_1.default.create({
            products: req.body.products,
            orderNumber: req.body.orderNumber,
            user: req.user.id,
            total: req.body.total,
            createdAt: new Date(),
            updatedAt: new Date(),
            invoiceId: req.body.invoiceId,
            paymentStatus: "UNPAID",
            deliveryStatus: "PENDING",
        });
        yield basketModel_1.default.findOneAndUpdate({ user: req.user.id }, { $set: { products: [] } });
        return res
            .status(201)
            .json({ msg: "Order successfully created", invoiceId: order.invoiceId });
    }
    catch (error) {
        console.error("error in creating order", error);
        return res.status(400).json({ msg: "Failed to create order" });
    }
});
exports.createOrder = createOrder;
const getOrdersInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find({ shopId: req.user.id })
            .populate("user")
            .populate("products.product");
        return res.status(200).send(orders);
    }
    catch (error) {
        console.error("error in getOrdersInAdmin", error);
        return res.status(400).send("Failed to get orders");
    }
});
exports.getOrdersInAdmin = getOrdersInAdmin;
const getSelectedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find({ shopId: req.user.id })
            .populate("user")
            .populate("products.product");
    }
    catch (error) {
        console.error("error in getSelectedOrder", error);
    }
});
exports.getSelectedOrders = getSelectedOrders;
const getOrdersOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find({ user: req.user.id }).populate("user");
        return res.status(200).send(orders);
    }
    catch (error) {
        console.error("error in getordersofuser", error);
        return res.status(400).json({ error: error });
    }
});
exports.getOrdersOfUser = getOrdersOfUser;
const changeOrderInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orderModel_1.default.findOneAndUpdate({ _id: req.params.id }, { invoiceId: req.body.invoiceId });
        return res.status(200).json({ msg: "Invoice id updated" });
    }
    catch (error) {
        console.error("error in change order invoice", error);
        return res.status(400).json({ error: error });
    }
});
exports.changeOrderInvoice = changeOrderInvoice;
const changeDeliveryStatusOfStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error("error in change delivery status of order", error);
    }
});
exports.changeDeliveryStatusOfStatus = changeDeliveryStatusOfStatus;
