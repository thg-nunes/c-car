import { container } from 'tsyringe';
import { CategoryRepositorie } from '../../modules/cars/repositories/categoriesRepositorie';
import { IRepositorie } from '../../modules/cars/repositories/ICategoriesRepository';

container.registerSingleton<IRepositorie>('CategoryRepositorie', CategoryRepositorie);
