import { AppError } from '../../../../shared/errors/AppError';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';
import { ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';

interface IRequest {
  car_id: string;
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private carRepositorie: ICarRepositorie, specificationRepository: ISpecificationRepository) {}

  async execute({ car_id, name, description }: IRequest) {
    const car_exists = await this.carRepositorie.findById(car_id);

    if (!car_exists) {
      throw new AppError('Car does not exists!');
    }

    const specificationAlreadyExists = this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) throw new AppError('Specification already exists');

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
