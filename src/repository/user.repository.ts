import {sql} from '@vercel/postgres';
import { User } from '../entity/user.entity';
import { generatePassword } from '../utils';

export interface UserRequestBody {
    name: string;
    username: string;
    password: string;
}

export interface UpdateUserRequestBody extends Omit<UserRequestBody, 'password'> {
    id: number;
}

export interface UpdateUserPasswordRequestBody extends Omit<UserRequestBody, 'name' | 'username'> {
    id: number;
}

export async function createUser({
    name,
    username,
    password
}: UserRequestBody): Promise<User> {
    const client = await sql.connect();
    const hashPassword = generatePassword(password);
    try {
        const user = await client.sql`INSERT INTO users(name, username, password, point) VALUES(${name}, ${username}, ${hashPassword}, 100)`;
        return user.rows[0] as User;
    } finally {
        client.release();
    }
}

export async function updateUser({
    id,
    name,
    username,
}: UpdateUserRequestBody): Promise<User> {
    const client = await sql.connect();
    try {
        const user = await client.sql`UPDATE users SET name = ${name}, username = ${username} WHERE id = ${id}`;
        return user.rows[0] as User;
    } finally {
        client.release();
    }
}

export async function updateUserPassword({
    id,
    password
}: UpdateUserPasswordRequestBody): Promise<User> {
    const client = await sql.connect();
    const hashPassword = generatePassword(password);
    try {
        const user = await client.sql`UPDATE users SET password = ${hashPassword} WHERE id = ${id}`;
        return user.rows[0] as User;
    } finally {
        client.release();
    }
}

export async function getUserById(id: number): Promise<User> {
    const client = await sql.connect();
    try {
        const result = await client.sql`SELECT * FROM users WHERE id = ${id}`;
        return result.rows[0] as User;
    } finally {
        client.release();
    }
}

export async function getAllUsers(from: number = 1, limit: number = 10): Promise<User[]> {
    const client = await sql.connect();
    try {
        const result = await client.sql`SELECT * FROM users ORDER BY id ASC LIMIT ${limit} OFFSET ${((from - 1) * limit)}`;
        return result.rows as User[];
    } finally {
        client.release();
    }
}

export async function getUserByUsername(username: string): Promise<User | null> {
    const client = await sql.connect();
    try {
        const result = await client.sql`SELECT * FROM users WHERE username = ${username}`;
        return result.rows[0] as User;
    } finally {
        client.release();
    }
}

export async function getCountUser(condition: string): Promise<number> {
    const client = await sql.connect();

    try {
        const result = await client.sql`SELECT COUNT(*) users ${condition}`;
        return result.rows[0].count as number;
    } finally {
        client.release();
    }
}
