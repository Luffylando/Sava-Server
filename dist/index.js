"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const controllers_1 = require("./controllers");
const swaggerOptions_1 = require("./swaggerOptions");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.SERVER_PORT || 8000;
// routes
app.use('/', controllers_1.routes);
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.swaggerOptions);
// Wrapp app with swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.listen(PORT, () => {
    console.log('PORT:', `http://localhost:${PORT}`);
});
