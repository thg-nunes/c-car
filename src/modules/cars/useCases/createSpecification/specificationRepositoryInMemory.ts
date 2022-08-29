import { v4 as uuid } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { ISpecificatiionDTO, ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';
import { Specification } from '../../infra/typeorm/entities/specification';

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ISpecificatiionDTO): Promise<void> {
    const specificationAlreadyExists = this.specifications.find((specification) => specification.name === name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    this.specifications.push({
      id: uuid(),
      created_at: new Date(),
      name,
      description,
    });
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification;
  }
}
export { SpecificationRepositoryInMemory };
