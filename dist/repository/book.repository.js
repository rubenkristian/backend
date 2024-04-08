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
exports.getCountBook = exports.getBooksByTag = exports.getSearchBookByTitle = exports.getAllBook = exports.getBook = exports.deleteBook = exports.updateBook = exports.createBook = void 0;
const postgres_1 = require("@vercel/postgres");
function createBook(_a) {
    return __awaiter(this, arguments, void 0, function* ({ title, writer, cover_image, point, }) {
        const client = yield postgres_1.sql.connect();
        try {
            const book = yield client.sql `INSERT INTO books(title, writer, cover_image, points) VALUES(${title}, ${writer}, ${cover_image}, ${point})`;
            return book.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.createBook = createBook;
function updateBook(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, title, writer, cover_image, point, }) {
        const client = yield postgres_1.sql.connect();
        try {
            const book = yield client.sql `UPDATE books SET title = ${title}, writer = ${writer}, cover_image = ${cover_image}, points = ${point} WHERE id = ${id}`;
            return book.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.updateBook = updateBook;
function deleteBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const book = yield client.sql `DELETE FROM books WHERE id = ${id}`;
            return book.rows[0];
        }
        finally {
            client.release();
        }
    });
}
exports.deleteBook = deleteBook;
function getBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM books WHERE id = ${id}`;
            return result.rows[0] || null;
        }
        finally {
            client.release();
        }
    });
}
exports.getBook = getBook;
function getAllBook() {
    return __awaiter(this, arguments, void 0, function* (from = 1, limit = 10) {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM books ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getAllBook = getAllBook;
function getSearchBookByTitle(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, from = 1, limit = 10) {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM books WHERE title LIKE '%${query}%' OR writer LIKE '%${query}%' ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getSearchBookByTitle = getSearchBookByTitle;
function getBooksByTag(tag_1) {
    return __awaiter(this, arguments, void 0, function* (tag, from = 1, limit = 10) {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT * FROM books WHERE id IN(SELECT order_id FROM book_tags WHERE tag_id IN (${tag.join(",")})) ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
            return result.rows;
        }
        finally {
            client.release();
        }
    });
}
exports.getBooksByTag = getBooksByTag;
function getCountBook(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield postgres_1.sql.connect();
        try {
            const result = yield client.sql `SELECT COUNT(*) books ${condition}`;
            return result.rows[0].count;
        }
        finally {
            client.release();
        }
    });
}
exports.getCountBook = getCountBook;
//# sourceMappingURL=book.repository.js.map