import { Specification } from '../entities/specification';
import { ISpecificatiionDTO, ISpecificationRepository } from '../../protocols/iSpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create({ name, description }: ISpecificatiionDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const sepecification = this.specifications.find((specification) => specification.name === name);

    return sepecification;
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error('Method not implemented.');
  }
}

export { SpecificationRepository };
