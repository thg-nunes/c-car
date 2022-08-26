import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/category';
import { ICreateCategoryDTO, IRepositorie } from '../../../protocols/ICategoriesRepository';

class CategoryRepositorie implements IRepositorie {
  private repositorie: Repository<Category>;

  constructor() {
    this.repositorie = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categorie = this.repositorie.create({
      name,
      description,
    });

    await this.repositorie.save(categorie);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repositorie.find();
    return categories;
  }

  async categoryExists(name: string): Promise<Category | undefined> {
    const category = this.repositorie.findOne({
      where: {
        name,
      },
    });
    return category;
  }
}

export { CategoryRepositorie };
