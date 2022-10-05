import { Category } from '../../infra/typeorm/entities/category';
import { CategoryRepositorie } from '../../infra/typeorm/repositories/categoriesRepositorie';

class ListCategoriesUseCase {
  constructor(private categoryRepositorie: CategoryRepositorie) {}

  execute(): Promise<Category[]> {
    const repositories = this.categoryRepositorie.list();

    return repositories;
  }
}

export { ListCategoriesUseCase };
