import express, {NextFunction, Request, Response} from 'express';
import * as orderService from '../service/order.service';
import * as userService from '../service/user.service';
import * as bookService from '../service/book.service';
import { VerifyRequest } from '../utils';
import { OrderRequestBody } from '../repository/order.repository';

const router = express.Router();

router.get('/', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    try {
        const {query} = req;
        const from = parseInt(query.from as string ?? '1');
        const limit = parseInt(query.size as string ?? '10');

        const orders = await orderService.getAllOrders(req.user.user_id, from, limit);

        res.json({
            data: orders,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/buy', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    const {
        book_id,
    }: OrderRequestBody = req.body;

    const { user: {user_id} } = req;

    const book = await bookService.getBookById(book_id);
    const user = await userService.getUserById(user_id);

    if (!book) {
        return res.status(404).json({
            message: 'failed to buy, book not found',
        });
    }

    if (user.points < book.points) {
        return res.status(400).json({
            message: 'Failed buy order: your points is not enough'
        });
    }

    const order = await orderService.createOrder({
        user_id,
        book_id,
    });

    if (order) {
        return res.status(201).json({
            message: 'success buy book',
            order: order,
        });
    }

    return res.status(500)
});

router.put('/cancel/:order_id', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    const { user: {user_id} } = req;
    const order_id = parseInt(req.params.order_id as string);
    const order = await orderService.getOrderById(order_id);

    if (order) {
        return res.status(404).json({
            message: 'order not found',
        });
    }

    if (order.user_id !== user_id) {
        return res.status(403).json({
            message: 'Forbidden: User is not authorized',
        });
    }

    const status = await orderService.cancelOrder(order_id);

    if (status) {
        return res.status(201).json({
            message: 'success cancel order',
        });
    }

    return res.status(500).json({
        message: 'error cancel order',
    });
});

export default router;