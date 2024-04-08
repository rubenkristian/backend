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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountOrder = exports.getAllOrderByUser = exports.getOrderById = exports.cancelOrder = exports.createOrder = void 0;
const postgres_1 = require("@vercel/postgres");
function createOrder(_a) {
    return __awaiter(this, arguments, void 0, function* ({ user_id, book_id, }) {
        const client = yield postgres_1.sql.connect();
        try {
            const order = yield client.sql `INSERT INTO orders(user_id, book_id) VALUES(${user_id}, ${book_id})`;
            return order.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.createOrder = createOrder;
function cancelOrder(order_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const order = yield client.sql `UPDATE orders SET cancelled = TRUE, cancelled_at = CURRENT_TIMESTAMP WHERE id = ${order_id}`;
            return order.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.cancelOrder = cancelOrder;
function getOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM orders WHERE id = ${id}`;
            return result.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.getOrderById = getOrderById;
function getAllOrderByUser(user_id_1) {
    return __awaiter(this, arguments, void 0, function* (user_id, from = 1, limit = 10) {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM orders WHERE user_id = ${user_id} ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getAllOrderByUser = getAllOrderByUser;
function getCountOrder(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT COUNT(*) orders ${condition}`;
            return result.rows[0].count;
        }
        finally {
            client.release();
        }
    });
}
exports.getCountOrder = getCountOrder;
//# sourceMappingURL=order.repository.js.map