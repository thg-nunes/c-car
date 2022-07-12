import { Request, Response, Router } from 'express';
import { Category } from '../model/category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, categorie } = req.body;

  const category = new Category();

  Object.assign(category, {
    name,
    categorie,
    created_at: new Date(),
  });

  categories.push(category);

  return res.status(201).send({ category });
});

export { categoriesRoutes };
