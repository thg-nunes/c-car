import { AppError } from '../../../shared/errors/AppError';
import { ISpecificationRepository } from '../infra/typeorm/repositories/iSpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists = this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) throw new AppError('Specification already exists');

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
