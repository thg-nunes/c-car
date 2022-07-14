import { IRepositorie } from '../repositories/ICategoriesRepository';

interface ICreateCategoryService {
  name: string;
  description: string;
}

/** Aqui é aplicado o single resposability principle,
 * pois essa classe tem só uma funcionalidade, que é criar uma categoria */
class CreateCategoryService {
  constructor(private categoryRepositorie: IRepositorie) {}

  excute({ name, description }: ICreateCategoryService): void {
    const categoryAlreadExists = this.categoryRepositorie.categoryExists(name);

    if (categoryAlreadExists) {
      throw new Error('Category already exists.');
    }

    this.categoryRepositorie.create({ name, description });
  }
}

export { CreateCategoryService };
