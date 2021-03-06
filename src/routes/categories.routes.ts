import { Request, Response, Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

/** Aqui é aplicado o single resposability principle, pois essa rota tem só uma funcionalidade,
 * que chamar o serviço que cria uma categoria
 */
categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});
export { categoriesRoutes };
