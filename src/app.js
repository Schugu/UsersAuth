import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import { createUserRouter } from './routes/users.routes.js';

dotenv.config();

export const createApp = ({ userModel }) => {
  const PORT = parseInt(process.env.PORT ?? '3000', 10);
  const HOST = process.env.HOST ?? 'localhost';
  const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';


  const app = express();

  app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
  }));

  app.disable('x-powered-by');
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger("dev"));


  // Rutas
  app.use('/api', createUserRouter({ userModel }));

  // Manejo de rutas no encontradas
  app.use((req, res) => {
    res.status(404).send('Ruta no encontrada :/');
  });


  // Iniciar el servidor
  app.listen(PORT, HOST, (error) => {
    if (error) {
      console.error('Error al iniciar el servidor:', error);
    } else {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    }
  });
}