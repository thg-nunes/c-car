import 'reflect-metadata';
import { CreateCategoryUseCase } from '../createCategory/createCategoryUseCase';
import { Category } from '../../entities/category';
import { ICreateCategoryDTO, IRepositorie } from '../../repositories/ICategoriesRepository';
import { AppError } from '../../../../middlewares/errors/AppError';

const mockCategoryRepository = () => {
  class CategoryRepositorie implements IRepositorie {
    private users: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
      const category = new Category();

      Object.assign(category, {
        name,
        description,
      });

      this.users.push(category);
    }

    async list(): Promise<Category[]> {
      const users_list = this.users;
      return users_list;
    }

    async categoryExists(name: string): Promise<Category | undefined> {
      const category_already_exists = this.users.find((user) => {
        return user.name === name;
      });

      return category_already_exists;
    }
  }

  const categoryRepositorie = new CategoryRepositorie();

  return categoryRepositorie;
};

describe('CreateCategoryUseCase', () => {
  it('shoud create a new category', async () => {
    const categoryRepositorie = mockCategoryRepository();
    const sut = new CreateCategoryUseCase(categoryRepositorie);

    const category = {
      name: 'any_category',
      description: 'any_description',
    };

    await sut.excute(category);

    const category_created = await categoryRepositorie.categoryExists(category.name);

    expect(category_created).toHaveProperty('name', 'any_category');
    expect(category_created).toHaveProperty('description', 'any_description');
  });

  it('shoud throw error if category already exists', () => {
    expect(async () => {
      const categoryRepositorie = mockCategoryRepository();
      const sut = new CreateCategoryUseCase(categoryRepositorie);

      const category = {
        name: 'any_category',
        description: 'any_description',
      };

      await sut.excute(category);

      await sut.excute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
