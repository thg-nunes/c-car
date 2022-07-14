import { Request, Response, Router } from 'express';
import { CategoryRepositorie } from '../modules/cars/repositories/categoriesRepositorie';
import { CreateCategoryService } from '../modules/cars/services/createCategoryService';

const categoriesRoutes = Router();
const categoryRepositorie = new CategoryRepositorie();

/** Aqui é aplicado o single resposability principle, pois essa rota tem só uma funcionalidade,
 * que chamar o serviço que cria uma categoria
 */
categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  const createCategoryService = new CreateCategoryService(categoryRepositorie);

  createCategoryService.excute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoryRepositorie.list();

  return res.json(all);
});
export { categoriesRoutes };
