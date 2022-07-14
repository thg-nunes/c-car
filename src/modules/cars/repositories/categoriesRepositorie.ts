import { Category } from '../model/category';
import { ICreateCategoryDTO, IRepositorie } from './ICategoriesRepository';

class CategoryRepositorie implements IRepositorie {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  categoryExists(name: string): Category | undefined {
    const category = this.categories.find((categorie) => categorie.name === name);
    return category;
  }
}

export { CategoryRepositorie };
