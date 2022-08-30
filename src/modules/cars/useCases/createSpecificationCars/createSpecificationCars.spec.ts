import { AppError } from '../../../../shared/errors/AppError';
import { CarRepositoryInMemory } from '../createCar/carRepositoryInMemory';
import { CreateSpecificationCarsUseCase } from './createSpecificationCarsUseCase';
import { SpecificationCarsRepositoryInMemory } from './specificationCarsRepositoryInMemory';

let createSpecificationCarsUseCase: CreateSpecificationCarsUseCase;
let carRepositorieInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationCarsRepositoryInMemory;

describe('CreateSpecification clas', () => {
  beforeEach(() => {
    carRepositorieInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationCarsRepositoryInMemory();

    createSpecificationCarsUseCase = new CreateSpecificationCarsUseCase(
      carRepositorieInMemory,
      specificationRepositoryInMemory,
    );
  });

  it('shold throw an error if car or specification id does not exists', () => {
    expect(async () => {
      const car_id = '1221';
      const specification_id = ['5821'];

      await createSpecificationCarsUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shold create an new car if car id exists', async () => {
    const car = await carRepositorieInMemory.create({
      id: 'any_id',
      available: true,
      name: 'any_name',
      description: 'any_description',
      daily_rate: 12,
      fine_amount: 123,
      license_plate: 'any_license_plate',
      brand: 'any_brand',
      category_id: 'any_id',
    });

    const creating_specification = await specificationRepositoryInMemory.create({
      name: 'any_name',
      description: 'any_description',
    });

    const all_specifications = await createSpecificationCarsUseCase.execute({
      car_id: car.id,
      specification_id: [creating_specification.id],
    });

    expect(all_specifications).toHaveProperty('specification');
    expect(all_specifications.specification.length).toBe(1);
  });
});
