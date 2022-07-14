import { Category } from '../model/category';
import { ICreateCategoryDTO, IRepositorie } from './ICategoriesRepository';

class CategoryRepositorie implements IRepositorie {
  private categories: Category[];

  private static INSTANCE: CategoryRepositorie;

  private constructor() {
    this.categories = [];
  }

  static get instance(): CategoryRepositorie {
    if (!CategoryRepositorie.INSTANCE) {
      CategoryRepositorie.INSTANCE = new CategoryRepositorie();
    }

    return CategoryRepositorie.INSTANCE;
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
