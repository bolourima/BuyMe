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
exports.checkPayment = exports.createInvoice = void 0;
const axios_1 = __importDefault(require("axios"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://merchant.qpay.mn/v2/invoice", {
            invoice_code: "POWER_EXPO_INVOICE",
            sender_invoice_no: "1234567",
            invoice_receiver_code: "terminal",
            invoice_description: "test",
            amount: 10,
            callback_url: "https://buymeuserfe-ofjixqgcj-bolormaas-projects.vercel.app",
        }, {
            headers: {
                Authorization: `Bearer ${req.body.token}`,
            },
        });
        return res.status(201).send(response.data);
    }
    catch (error) {
        console.error("error in create invoice", error);
        return res.status(400).json({ msg: error });
    }
});
exports.createInvoice = createInvoice;
const checkPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios_1.default.post("https://merchant.qpay.mn/v2/payment/check", {
            object_type: "INVOICE",
            object_id: req.body.invoiceId,
            offset: {
                page_number: 1,
                page_limit: 100,
            },
        }, { headers: { Authorization: `Bearer ${req.body.token}` } });
        if (((_a = response.data.rows[0]) === null || _a === void 0 ? void 0 : _a.payment_status) === "PAID") {
            yield orderModel_1.default.findOneAndUpdate({ invoiceId: req.body.invoiceId }, { paymentStatus: "PAID" });
        }
        return res.status(200).send((_b = response.data.rows[0]) === null || _b === void 0 ? void 0 : _b.payment_status);
    }
    catch (error) {
        console.log("error in checkpayment", error);
        return res.status(400).send("Failed");
    }
});
exports.checkPayment = checkPayment;
