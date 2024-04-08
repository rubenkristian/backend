import { generatePassword, signToken } from '../utils';
import { User } from '../entity/user.entity';
import * as userRepository from '../repository/user.repository';

export interface UserToken {
    user_id: number | null;
    token: string | null;
    error: string | null;
}

export async function getAllUser(from: number = 1, limit: number = 10): Promise<User[]> {
    return await userRepository.getAllUsers(from, limit);
}

export async function getUserById(id: number): Promise<User> {
    return await userRepository.getUserById(id);
}

export async function authentication(username: string, password: string): Promise<UserToken> {
    const user = await userRepository.getUserByUsername(username);
    const hash = generatePassword(password);

    if (user && hash === user.password) {
        const token = await signToken({
            user_id: user.id,
            username: user.username
        });
        return {
            user_id: user.id,
            token: token,
            error: null,
        };
    }

    return {
        user_id: null,
        token: null,
        error: 'username or password is wrong',
    };
}