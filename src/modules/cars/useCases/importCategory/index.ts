import { CategoryRepositorie } from '../../infra/typeorm/repositories/category/categoriesRepositorie';
import { ImportCategoryController } from './importCategoryController';
import { ImportCategoryUseCase } from './importCategoryUseCase';

const categoryRepositorie = new CategoryRepositorie();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepositorie);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };
