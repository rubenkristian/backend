import express, {NextFunction, Request, Response} from 'express';
import bookController from './controller/book.controller';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import PingController from './controller/ping';
import morgan from "morgan";
import { Payload, VerifyRequest, secretKey } from './utils';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

const options = {
    swaggerDefinition: {
        restapi: '3.0.0',
        info: {
        title: 'My API',
        version: '1.0.0',
        description: 'My REST API',
        },
    },
    apis: [`${__dirname}/**/*.js`]
}
const specs = swaggerJsdoc(options);

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
    })
);

app.use(async (req: VerifyRequest, res: Response, next: NextFunction) => {
    const exclude: string[] = ['/docs/', 'user/register', 'user/login', '/docs/swagger-ui.css'];

    if (exclude.includes(req.path)) {
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
        });
    }

    try {
        const decode = jwt.verify(token, secretKey) as Payload;
        req.user = decode;
        next();
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token',
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }
});

app.get('/ping', async (req: Request, res: Response) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

app.use('/books', bookController);

app.listen(process.env.PORT || 8080, () => {
    
});