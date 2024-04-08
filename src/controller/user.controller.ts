import express, {NextFunction, Request, Response} from 'express';
import * as bookService from '../service/book.service';
import { VerifyRequest } from '../utils';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    
});

router.get('/profile', async (req: VerifyRequest, res: Response, next: NextFunction) => {
    
});

export default router;