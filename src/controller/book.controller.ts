import express, {NextFunction, Request, Response} from 'express';
import * as bookService from '../service/book.service';
import { VerifyRequest } from '../utils';

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    try {
        const {query} = req;
        const from = parseInt(query.from as string ?? '1');
        const limit = parseInt(query.size as string ?? '10');
        
        const books = await bookService.getAllBooks(from, limit);
        
        res.json({
            data: books,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     summary: Get detail book
 *     description: Retrieve detail book
 *     responses:
 *       200:
 *         description: A detail of book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
router.get('/:id', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    try {
        const {params} = req;
        
        const book = await bookService.getBookById(parseInt(params.id));
        
        res.json(book);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;