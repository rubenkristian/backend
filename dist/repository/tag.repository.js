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
exports.getCountTag = exports.getAllTagBook = exports.getAllTags = void 0;
const postgres_1 = require("@vercel/postgres");
function getAllTags() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM tags ORDER BY name ASC`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getAllTags = getAllTags;
function getAllTagBook(book_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM tags WHERE id IN(SELECT tag_id FROM book_tags WHERE book_id = ${book_id}) ORDER BY id ASC`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getAllTagBook = getAllTagBook;
function getCountTag(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT COUNT(*) tags ${condition}`;
            return result.rows[0].count;
        }
        finally {
            client.release();
        }
    });
}
exports.getCountTag = getCountTag;
//# sourceMappingURL=tag.repository.js.map