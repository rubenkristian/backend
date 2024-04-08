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
exports.getCountUser = exports.getUserByUsername = exports.getAllUsers = exports.getUserById = exports.updateUserPassword = exports.updateUser = exports.createUser = void 0;
const postgres_1 = require("@vercel/postgres");
const utils_1 = require("../utils");
function createUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, username, password }) {
        const client = yield postgres_1.sql.connect();
        const hashPassword = (0, utils_1.generatePassword)(password);
        try {
            const user = yield client.sql `INSERT INTO users(name, username, password, point) VALUES(${name}, ${username}, ${hashPassword}, 100)`;
            return user.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.createUser = createUser;
function updateUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, name, username, }) {
        const client = yield postgres_1.sql.connect();
        try {
            const user = yield client.sql `UPDATE users SET name = ${name}, username = ${username} WHERE id = ${id}`;
            return user.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.updateUser = updateUser;
function updateUserPassword(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, password }) {
        const client = yield postgres_1.sql.connect();
        const hashPassword = (0, utils_1.generatePassword)(password);
        try {
            const user = yield client.sql `UPDATE users SET password = ${hashPassword} WHERE id = ${id}`;
            return user.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.updateUserPassword = updateUserPassword;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM users WHERE id = ${id}`;
            return result.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.getUserById = getUserById;
function getAllUsers() {
    return __awaiter(this, arguments, void 0, function* (from = 1, limit = 10) {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM users ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM users WHERE username = ${username}`;
            return result.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.getUserByUsername = getUserByUsername;
function getCountUser(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT COUNT(*) users ${condition}`;
            return result.rows[0].count;
        }
        finally {
            client.release();
        }
    });
}
exports.getCountUser = getCountUser;
//# sourceMappingURL=user.repository.js.map