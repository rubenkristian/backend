import { Order } from '../entity/order.entity';
import * as orderRepository from '../repository/order.repository';

export async function getAllOrders(user_id: number, from: number = 1, limit: number = 10): Promise<Order[]> {
    return await orderRepository.getAllOrderByUser(user_id, from, limit);
}

export async function createOrder({
    user_id,
    book_id,
}: orderRepository.OrderRequestBody): Promise<Order> {
    return await orderRepository.createOrder({
        user_id: user_id,
        book_id: book_id,
    });
}

export async function cancelOrder(order_id: number): Promise<Order> {
    return await orderRepository.cancelOrder(order_id);
}

export async function getOrderById(order_id: number): Promise<Order> {
    return await orderRepository.getOrderById(order_id);
}
