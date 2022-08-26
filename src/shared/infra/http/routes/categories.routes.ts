import { Router } from 'express';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/createCategoryController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.get('/', createCategoryController.getCategories);
categoriesRoutes.post('/', authUser, userIsAdmin, createCategoryController.handle);

export { categoriesRoutes };
