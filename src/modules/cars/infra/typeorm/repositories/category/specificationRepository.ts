import { Specification } from '../../entities/specification';
import { ISpecificatiionDTO, ISpecificationRepository } from '../../../protocols/iSpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ISpecificatiionDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification | undefined {
    const sepecification = this.specifications.find((specification) => specification.name === name);

    return sepecification;
  }
}

export { SpecificationRepository };
