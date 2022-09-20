import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { categoriesRoutes } from './routes/categories.routes';
import { usersRoutes } from './routes/users.routes';

import createConnection from '../typeorm';

import '../../container';

createConnection();

import { authenticateRoutes } from './routes/athenticate.routes';
import { AppError } from '../../errors/AppError';
import { cars } from './routes/cars.routes';
import { specifications } from './routes/specification.routes';
import { rentalRoutes } from './routes/rental.routes';
import { passwordRoutes } from './routes/sendEmailToGetResetPassword.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);
app.use('/cars', cars);
app.use('/specification', specifications);
app.use('/rental', rentalRoutes);
app.use('/password', passwordRoutes);
app.use(authenticateRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof AppError === false) {
    return res.status(500).json({
      status: 'error',
      message: `Internal server error ${err.message}`,
    });
  }

  next();
});

app.listen(3333, () => console.log('server runing on port 3333'));
