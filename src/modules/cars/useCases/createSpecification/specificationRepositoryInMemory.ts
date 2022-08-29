import { v4 as uuid } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { ISpecificatiionDTO, ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';
import { Specification } from '../../infra/typeorm/entities/specification';

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ISpecificatiionDTO): Promise<Specification> {
    const specificationAlreadyExists = this.specifications.find((specification) => specification.name === name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    const specification = {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
    };

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = this.specifications.filter((specification) => ids.includes(specification.id));

    return specification;
  }
}
export { SpecificationRepositoryInMemory };
