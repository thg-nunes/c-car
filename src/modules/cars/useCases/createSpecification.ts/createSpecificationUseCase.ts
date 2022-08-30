import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ISpecificationRepository } from '../../infra/protocols/iSpecificationRepository';
import { Specification } from '../../infra/typeorm/entities/specification';

type IRequest = {
  name: string;
  description: string;
};

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specification_alreadyExists = await this.specificationRepository.findByName(name);

    if (specification_alreadyExists) {
      throw new AppError('Specification already exists!');
    }

    const specification = await this.specificationRepository.create({ name, description });

    return specification;
  }
}

export { CreateSpecificationUseCase };
