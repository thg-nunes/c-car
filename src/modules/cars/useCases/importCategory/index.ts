import { CategoryRepositorie } from '../../repositories/categoriesRepositorie';
import { ImportCategoryController } from './importCategoryController';
import { ImportCategoryUseCase } from './importCategoryUseCase';

const categoryRepositorie = CategoryRepositorie.instance;
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepositorie);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };
