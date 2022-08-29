import 'reflect-metadata';
import { CreateCategoryUseCase } from '../createCategory/createCategoryUseCase';
import { Category } from '../../infra/typeorm/entities/category';
import { ICreateCategoryDTO, IRepositorie } from '../../infra/protocols/ICategoriesRepository';
import { AppError } from '../../../../shared/errors/AppError';

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

  it('', async () => {
    const categoryRepositorie = mockCategoryRepository();

    categoryRepositorie.create({
      name: 'SUV',
      description: 'any_description_suv',
    });

    categoryRepositorie.create({
      name: 'sport',
      description: 'any_description_sport',
    });

    const sut = new CreateCategoryUseCase(categoryRepositorie);

    const categories = await sut.categories();

    expect(categories.length).toBe(2);
  });
});
