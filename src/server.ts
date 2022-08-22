import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { categoriesRoutes } from './shared/infra/http/routes/categories.routes';
import { specificationRoutes } from './shared/infra/http/routes/specification.routes';
import { usersRoutes } from './shared/infra/http/routes/users.routes';

import './shared/infra/typeorm';
import './shared/container';
import { authenticateRoutes } from './shared/infra/http/routes/athenticate.routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specification', specificationRoutes);
app.use('/users', usersRoutes);
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
