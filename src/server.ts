import 'reflect-metadata';
import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationRoutes } from './routes/specification.routes';
import { usersRoutes } from './routes/users.routes';

import './database';
import './shared/container';
import { authenticateRoutes } from './routes/athenticate.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specification', specificationRoutes);
app.use('/users', usersRoutes);
app.use(authenticateRoutes);

app.listen(3333, () => console.log('server runing on port 3333'));
