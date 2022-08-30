import { AppError } from '../../../../shared/errors/AppError';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';
import { CreateSpecificationUseCaseInMemory } from './createSpecificationUseCaseInMemory';

let createSpecificationUseCase: CreateSpecificationUseCase;
let createSpecificationUseCaseInMemory: CreateSpecificationUseCaseInMemory;

describe('CreateSpecificationUseCase', () => {
  beforeAll(() => {
    createSpecificationUseCaseInMemory = new CreateSpecificationUseCaseInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(createSpecificationUseCaseInMemory);
  });

  it('should create an new specification', async () => {
    const specification = {
      name: 'any_name',
      description: 'any_description',
    };

    await createSpecificationUseCase.execute(specification);

    expect(createSpecificationUseCaseInMemory.specifications.length).toBe(1);
  });

  it('should throw an error if trying to create an already exists specification', () => {
    expect(async () => {
      const specification = {
        name: 'any_name',
        description: 'any_description',
      };

      await createSpecificationUseCase.execute(specification);
    }).rejects.toBeInstanceOf(AppError);
  });
});
