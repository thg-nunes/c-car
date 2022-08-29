import { AppError } from '../../../../shared/errors/AppError';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';
import { ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';

interface IRequest {
  car_id: string;
  specification_id: string;
}

class CreateSpecificationUseCase {
  constructor(private carRepositorie: ICarRepositorie, private specificationRepository: ISpecificationRepository) {}

  async execute({ car_id, specification_id }: IRequest) {
    const car_exists = await this.carRepositorie.findById(car_id);

    if (!car_exists) {
      throw new AppError('Car does not exists!');
    }
  }
}

export { CreateSpecificationUseCase };
