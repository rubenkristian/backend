import express, {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, _res: Response) => {
    return _res.send("test");
});

app.listen(process.env.PORT || 8080, () => {
    
});