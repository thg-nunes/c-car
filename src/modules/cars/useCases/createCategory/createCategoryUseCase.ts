import { inject, injectable } from 'tsyringe';
import { IRepositorie } from '../../repositories/ICategoriesRepository';

interface ICreateCategoryUseCase {
  name: string;
  description: string;
}

/** Aqui é aplicado o single resposability principle,
 * pois essa classe tem só uma funcionalidade, que é criar uma categoria */
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepositorie')
    private categoryRepositorie: IRepositorie,
  ) {}

  async excute({ name, description }: ICreateCategoryUseCase): Promise<void> {
    const categoryAlreadExists = await this.categoryRepositorie.categoryExists(name);

    if (categoryAlreadExists) {
      throw new Error('Category already exists.');
    }

    this.categoryRepositorie.create({ name, description });
  }
}

export { CreateCategoryUseCase };
