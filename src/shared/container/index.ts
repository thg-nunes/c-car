import { container } from 'tsyringe';
import { ICreateUser } from '../../modules/accounts/protocols/iCreateUserProtocol';
import { UserRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userRepositorie';
import { CategoryRepositorie } from '../../modules/cars/infra/typeorm/repositories/categoriesRepositorie';
import { IRepositorie } from '../../modules/cars/infra/typeorm/repositories/ICategoriesRepository';

container.registerSingleton<ICreateUser>('UserRepositorie', UserRepositorie);
container.registerSingleton<IRepositorie>('CategoryRepositorie', CategoryRepositorie);
