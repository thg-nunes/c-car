import 'reflect-metadata';
import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationRoutes } from './routes/specification.routes';

import './database';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specification', specificationRoutes);

app.listen(3333, () => console.log('server runing on port 3333'));
