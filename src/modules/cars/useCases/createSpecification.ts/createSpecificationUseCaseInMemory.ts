import { ISpecificatiionDTO, ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';
import { Specification } from '../../infra/typeorm/entities/specification';

class CreateSpecificationUseCaseInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ISpecificatiionDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) => ids.includes(specification.id));
  }
}

export { CreateSpecificationUseCaseInMemory };
