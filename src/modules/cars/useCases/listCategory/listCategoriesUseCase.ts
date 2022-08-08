import { Category } from '../../model/category';
import { CategoryRepositorie } from '../../repositories/categoriesRepositorie';

class ListCategoriesUseCase {
  constructor(private categoryRepositorie: CategoryRepositorie) {}

  execute(): Category[] {
    const repositories = this.categoryRepositorie.list();

    return repositories;
  }
}

export { ListCategoriesUseCase };
