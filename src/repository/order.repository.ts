import {sql} from '@vercel/postgres';
import { Order } from '../entity/order.entity';

export interface OrderRequestBody {
    user_id: number;
    book_id: number;
}

export async function createOrder({
    user_id,
    book_id,
}: OrderRequestBody): Promise<Order> {
    const client = await sql.connect();

    try {
        const order = await client.sql`INSERT INTO orders(user_id, book_id) VALUES(${user_id}, ${book_id})`;
        return order.rows[0] as Order;
    } finally {
        client.release();
    }
}

export async function cancelOrder(order_id: number): Promise<Order> {
    const client = await sql.connect();

    try {
        const order = await client.sql`UPDATE orders SET cancelled = TRUE, cancelled_at = CURRENT_TIMESTAMP WHERE id = ${order_id}`;
        return order.rows[0] as Order;
    } finally {
        client.release();
    }
}

export async function getOrderById(id: number): Promise<Order> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT * FROM orders WHERE id = ${id}`;
        return result.rows[0] as Order;
    } finally {
        client.release();
    }
}

export async function getAllOrderByUser(user_id: number, from: number = 1, limit: number = 10): Promise<Order[]> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT * FROM orders WHERE user_id = ${user_id} ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
        return result.rows as Order[];
    } finally {
        client.release();
    }
}

export async function getCountOrder(condition: string): Promise<number> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT COUNT(*) orders ${condition}`;
        return result.rows[0].count as number;
    } finally {
        client.release();
    }
}