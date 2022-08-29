import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/protocols/iCar';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';
import { ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';

interface IRequest {
  car_id: string;
  specification_id?: string[];
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('CarRepository')
    private carRepositorie: ICarRepositorie,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ car_id, specification_id, name, description }: IRequest): Promise<Car> {
    const car_exists = await this.carRepositorie.findById(car_id);

    if (!car_exists) {
      throw new AppError('Car does not exists!');
    }

    await this.specificationRepository.create({ name, description });

    const specifications = await this.specificationRepository.findByIds(specification_id);

    car_exists.specification = specifications;

    await this.carRepositorie.create(car_exists);

    return car_exists;
  }
}

export { CreateSpecificationUseCase };
