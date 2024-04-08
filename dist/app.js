"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = __importDefault(require("./controller/book.controller"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const ping_1 = __importDefault(require("./controller/ping"));
const morgan_1 = __importDefault(require("morgan"));
const utils_1 = require("./utils");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
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
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
}));
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const exclude = ['/docs/', 'user/register', 'user/login', '/docs/swagger-ui.css'];
    if (exclude.includes(req.path)) {
        return next();
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, utils_1.secretKey);
        req.user = decode;
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token',
            });
        }
        else {
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }
}));
app.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new ping_1.default();
    const response = yield controller.getMessage();
    return res.send(response);
}));
app.use('/books', book_controller_1.default);
app.listen(process.env.PORT || 8080, () => {
});
//# sourceMappingURL=app.js.map