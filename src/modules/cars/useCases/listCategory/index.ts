import { CategoryRepositorie } from '../../repositories/categoriesRepositorie';
import { ListCategoriesController } from './listCategoriesController';
import { ListCategoriesUseCase } from './listCategoriesUseCase';

const categoryRepositorie = CategoryRepositorie.instance;
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepositorie);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };
