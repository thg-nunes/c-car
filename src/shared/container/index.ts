import { container } from 'tsyringe';
import { ICreateUser } from '../../modules/accounts/protocols/iCreateUserProtocol';
import { UserRepositorie } from '../../modules/accounts/repositorie/userRepositorie';
import { CategoryRepositorie } from '../../modules/cars/repositories/categoriesRepositorie';
import { IRepositorie } from '../../modules/cars/repositories/ICategoriesRepository';

container.registerSingleton<ICreateUser>('UserRepositorie', UserRepositorie);
container.registerSingleton<IRepositorie>('CategoryRepositorie', CategoryRepositorie);
