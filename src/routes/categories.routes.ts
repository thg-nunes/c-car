import { Request, Response, Router } from 'express';
import { CategoryRepositorie } from '../repositories/categoriesRepositorie';

const categoriesRoutes = Router();
const categoryRepositorie = new CategoryRepositorie();

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  const categoryAlreadExists = categoryRepositorie.categoryExists(name);

  if (categoryAlreadExists) {
    return res.status(400).send({ error: 'Category alread exists.' });
  }

  categoryRepositorie.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoryRepositorie.list();

  return res.json(all);
});
export { categoriesRoutes };
