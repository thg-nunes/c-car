import multer from 'multer';

import { Request, Response, Router } from 'express';
import { listCategoriesController } from '../../../../modules/cars/useCases/listCategory';
import { importCategoryController } from '../../../../modules/cars/useCases/importCategory';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/createCategoryController';

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

/** Aqui é aplicado o single resposability principle, pois essa rota tem só uma funcionalidade,
 * que chamar o serviço que cria uma categoria
 */
categoriesRoutes.post('/', createCategoryController.handle);

// categoriesRoutes.get('/', (req: Request, res: Response) => {
//   return listCategoriesController.handle(req, res);
// });

// categoriesRoutes.post('/import', upload.single('file'), (req: Request, res: Response) => {
//   return importCategoryController.handle(req, res);
// });

export { categoriesRoutes };
