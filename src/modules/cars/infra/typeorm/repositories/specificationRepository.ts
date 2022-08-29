import { Specification } from '../entities/specification';
import { ISpecificatiionDTO, ISpecificationRepository } from '../../protocols/iSpecificationRepository';
import { getRepository, Repository } from 'typeorm';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ISpecificatiionDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const sepecification = this.repository.findOne({
      where: {
        name,
      },
    });

    return sepecification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationRepository };
