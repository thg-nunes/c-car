import { Request, Response, Router } from 'express';
import { CategoryRepositorie } from '../modules/cars/repositories/categoriesRepositorie';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();
const categoryRepositorie = new CategoryRepositorie();

/** Aqui é aplicado o single resposability principle, pois essa rota tem só uma funcionalidade,
 * que chamar o serviço que cria uma categoria
 */
categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoryRepositorie.list();

  return res.json(all);
});
export { categoriesRoutes };
