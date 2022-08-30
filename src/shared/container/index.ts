import { container } from 'tsyringe';
import { ICreateUser } from '../../modules/accounts/protocols/iCreateUserProtocol';
import { UserRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userRepositorie';
import { CategoryRepositorie } from '../../modules/cars/infra/typeorm/repositories/categoriesRepositorie';
import { IRepositorie } from '../../modules/cars/infra/protocols/ICategoriesRepository';
import { ICarRepositorie } from '../../modules/cars/infra/protocols/iCarRepositorie';
import { CarRepository } from '../../modules/cars/infra/typeorm/repositories/carRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/specificationRepository';
import { ISpecificationRepository } from '../../modules/cars/infra/protocols/iSpecificationRepository';
import { ICarImageRepository } from '../../modules/cars/infra/protocols/iCarImageRepository';
import { CarImageRepository } from '../../modules/cars/infra/typeorm/repositories/carImageRepository';

container.registerSingleton<ICreateUser>('UserRepositorie', UserRepositorie);
container.registerSingleton<IRepositorie>('CategoryRepositorie', CategoryRepositorie);
container.registerSingleton<ICarRepositorie>('CarRepository', CarRepository);
container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository);
container.registerSingleton<ICarImageRepository>('CarImageRepository', CarImageRepository);
