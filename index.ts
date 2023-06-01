import express, { Application } from 'express';
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { routes } from './controllers';
import { swaggerOptions } from './swaggerOptions';
import cors from 'cors';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.SERVER_PORT || 8000;

// routes
app.use('/', routes);
  
const specs = swaggerJsdoc(swaggerOptions);

// Wrapp app with swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.listen(PORT, (): void => {
    console.log('PORT:', `http://localhost:${PORT}`);
});