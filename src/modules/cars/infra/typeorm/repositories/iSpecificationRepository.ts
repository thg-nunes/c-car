import { Specification } from '../entities/specification';

interface ISpecificatiionDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ISpecificatiionDTO): void;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationRepository, ISpecificatiionDTO };
