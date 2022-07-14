import { CategoryRepositorie } from '../../repositories/categoriesRepositorie';
import { CreateCategoryController } from './createCategoryController';
import { CreateCategoryUseCase } from './createCategoryUseCase';

const categoryRepositorie = CategoryRepositorie.instance;
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositorie);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };
