import { Router } from 'express';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/createCategoryController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.get('/', createCategoryController.getCategories);
categoriesRoutes.post('/', createCategoryController.handle);

export { categoriesRoutes };
