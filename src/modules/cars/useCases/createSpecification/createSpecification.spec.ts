import { CarRepositoryInMemory } from '../createCar/carRepositoryInMemory';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

let createSpecificationUseCase: CreateSpecificationUseCase;
let carRepositorieInMemory: CarRepositoryInMemory;

describe('CreateSpecification clas', () => {
  beforeEach(() => {
    carRepositorieInMemory = new CarRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(carRepositorieInMemory);
  });

  it('shold create a new specification to car', async () => {
    const car_1 = await carRepositorieInMemory.create({
      available: true,
      brand: 'xxxxx',
      category_id: 'any_id',
      daily_rate: 150,
      description: 'any_description',
      fine_amount: 50,
      license_plate: 'any_license',
      name: 'any_name',
    });

    await createSpecificationUseCase.execute({ car_id: car_1.id });
  });
});
