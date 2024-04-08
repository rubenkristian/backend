import {sql} from '@vercel/postgres';
import { Book } from '../entity/book.entity';

export interface BookRequestBody {
    title: string;
    writer: string;
    cover_image: string;
    point: number;
}

export interface BookUpdateRequestBody extends BookRequestBody {
    id: number;
}

export async function createBook({
    title,
    writer,
    cover_image,
    point,
}: BookRequestBody): Promise<Book> {
    const client = await sql.connect();

    try {
        const book = await client.sql`INSERT INTO books(title, writer, cover_image, points) VALUES(${title}, ${writer}, ${cover_image}, ${point})`;
        return book.rows[0] as Book;
    } finally {
        client.release();
    }
}

export async function updateBook({
    id,
    title,
    writer,
    cover_image,
    point,
}: BookUpdateRequestBody): Promise<Book> {
    const client = await sql.connect();

    try {
        const book = await client.sql`UPDATE books SET title = ${title}, writer = ${writer}, cover_image = ${cover_image}, points = ${point} WHERE id = ${id}`;
        return book.rows[0] as Book;
    } finally {
        client.release();
    }
}

export async function deleteBook(id: number): Promise<Book> {
    const client = await sql.connect();
    try {
        const book = await client.sql`DELETE FROM books WHERE id = ${id}`;
        return book.rows[0] as Book;
    } finally {
        client.release();
    }
}

export async function getBook(id: number): Promise<Book | null> {
    const client = await sql.connect();
    try {
        const result = await client.sql`SELECT * FROM books WHERE id = ${id}`;
        return result.rows[0] as Book || null;
    } finally {
        client.release();
    }
}

export async function getAllBook(from: number = 1, limit: number = 10): Promise<Book[] | []> {
    const client = await sql.connect();
    try {
        const result = await client.sql`SELECT * FROM books ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
        return result.rows as Book[];
    } finally {
        client.release();
    }
}

export async function getSearchBookByTitle(query: string, from: number = 1, limit: number = 10): Promise<Book[] | []> {
    const client = await sql.connect();
    try {
        const result = await client.sql`SELECT * FROM books WHERE title LIKE '%${query}%' OR writer LIKE '%${query}%' ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
        return result.rows as Book[];
    } finally {
        client.release();
    }
}

export async function getBooksByTag(tag: number[], from: number = 1, limit: number = 10): Promise<Book[] | []> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT * FROM books WHERE id IN(SELECT order_id FROM book_tags WHERE tag_id IN (${tag.join(",")})) ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
        return result.rows as Book[];
    } finally {
        client.release();
    }
}

export async function getCountBook(condition: string): Promise<number> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT COUNT(*) books ${condition}`;
        return result.rows[0].count as number;
    } finally {
        client.release();
    }
}