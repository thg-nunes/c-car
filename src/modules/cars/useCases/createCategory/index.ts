import { CategoryRepositorie } from '../../infra/typeorm/repositories/categoriesRepositorie';
import { CreateCategoryController } from './createCategoryController';
import { CreateCategoryUseCase } from './createCategoryUseCase';

export default (): CreateCategoryController => {
  const categoryRepositorie = new CategoryRepositorie();

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositorie);

  const createCategoryController = new CreateCategoryController(createCategoryUseCase);

  return createCategoryController;
};
