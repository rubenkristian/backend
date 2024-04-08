import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {Request} from 'express';

export interface Payload {
    user_id: number;
    username: string;
}

export interface VerifyRequest extends Request {
    user: Payload;
}

export const secretKey = '1234';

export function generatePassword(password: string) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

export async function signToken(payload: Payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
}

export async function verifyToken(token: string): Promise<Payload> {
    try {
        const decode = jwt.verify(token, secretKey) as Payload;
        return decode;
    } catch (err) {
        return null;
    }
}