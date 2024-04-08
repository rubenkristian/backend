import {sql} from '@vercel/postgres';
import { Tag } from '../entity/tag.entity';

export async function getAllTags(): Promise<Tag[]> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT * FROM tags ORDER BY name ASC`;
        return result.rows as Tag[];
    } finally {
        client.release();
    }
}

export async function getAllTagBook(book_id: number): Promise<Tag[]> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT * FROM tags WHERE id IN(SELECT tag_id FROM book_tags WHERE book_id = ${book_id}) ORDER BY id ASC`;
        return result.rows as Tag[];
    } finally {
        client.release();
    }
}

export async function getCountTag(condition: string): Promise<number> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT COUNT(*) tags ${condition}`;
        return result.rows[0].count as number;
    } finally {
        client.release();
    }
}