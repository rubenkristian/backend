"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const orderService = __importStar(require("../service/order.service"));
const userService = __importStar(require("../service/user.service"));
const bookService = __importStar(require("../service/book.service"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { query } = req;
        const from = parseInt((_a = query.from) !== null && _a !== void 0 ? _a : '1');
        const limit = parseInt((_b = query.size) !== null && _b !== void 0 ? _b : '10');
        const orders = yield orderService.getAllOrders(req.user.user_id, from, limit);
        res.json({
            data: orders,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
router.post('/buy', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { book_id, } = req.body;
    const { user: { user_id } } = req;
    const book = yield bookService.getBookById(book_id);
    const user = yield userService.getUserById(user_id);
    if (!book) {
        return res.status(404).json({
            message: 'failed to buy, book not found',
        });
    }
    if (user.points < book.points) {
        return res.status(400).json({
            message: 'Failed buy order: your points is not enough'
        });
    }
    const order = yield orderService.createOrder({
        user_id,
        book_id,
    });
    if (order) {
        return res.status(201).json({
            message: 'success buy book',
            order: order,
        });
    }
    return res.status(500);
}));
router.put('/cancel/:order_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: { user_id } } = req;
    const order_id = parseInt(req.params.order_id);
    const order = yield orderService.getOrderById(order_id);
    if (order) {
        return res.status(404).json({
            message: 'order not found',
        });
    }
    if (order.user_id !== user_id) {
        return res.status(403).json({
            message: 'Forbidden: User is not authorized',
        });
    }
    const status = yield orderService.cancelOrder(order_id);
    if (status) {
        return res.status(201).json({
            message: 'success cancel order',
        });
    }
    return res.status(500).json({
        message: 'error cancel order',
    });
}));
exports.default = router;
//# sourceMappingURL=order.controller.js.map