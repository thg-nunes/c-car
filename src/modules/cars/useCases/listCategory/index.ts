import { CategoryRepositorie } from '../../infra/typeorm/repositories/category/categoriesRepositorie';
import { ListCategoriesController } from './listCategoriesController';
import { ListCategoriesUseCase } from './listCategoriesUseCase';

const categoryRepositorie = new CategoryRepositorie();
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepositorie);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };
