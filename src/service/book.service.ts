import * as bookRepository from '../repository/book.repository';
import { Book } from '../entity/book.entity';

export async function getAllBooks(from: number = 1, limit: number = 10): Promise<Book[]> {
    return await bookRepository.getAllBook(from, limit);
}

export async function getBookById(id: number): Promise<Book> {
    return await bookRepository.getBook(id);
}