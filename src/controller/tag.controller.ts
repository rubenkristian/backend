import express, {NextFunction, Request, Response} from 'express';
import * as bookService from '../service/book.service';
import { VerifyRequest } from '../utils';

const router = express.Router();

router.get('/', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    
});

export default router;