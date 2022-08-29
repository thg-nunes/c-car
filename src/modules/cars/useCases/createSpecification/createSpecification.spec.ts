import { AppError } from '../../../../shared/errors/AppError';
import { CarRepositoryInMemory } from '../createCar/carRepositoryInMemory';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';
import { SpecificationRepositoryInMemory } from './specificationRepositoryInMemory';

let createSpecificationUseCase: CreateSpecificationUseCase;
let carRepositorieInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('CreateSpecification clas', () => {
  beforeEach(() => {
    carRepositorieInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();

    createSpecificationUseCase = new CreateSpecificationUseCase(
      carRepositorieInMemory,
      specificationRepositoryInMemory,
    );
  });

  it('shold throw an error if car or specification id does not exists', () => {
    expect(async () => {
      const car_id = '1221';
      const specification_id = ['5821'];

      await createSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shold create an new car if car id exists', async () => {
    const car = await carRepositorieInMemory.create({
      available: true,
      brand: 'any_brand',
      category_id: 'any_id',
      daily_rate: 12,
      description: 'any_description',
      fine_amount: 123,
      license_plate: 'any_license_plate',
      name: 'any_name',
      id: 'any_id',
    });

    const specification_id = ['1234'];

    await createSpecificationUseCase.execute({ car_id: car.id, specification_id });
  });
});
