import { CarRepositoryInMemory } from '../createCar/carRepositoryInMemory';
import { ListCarUseCase } from './listCarUseCase';

let listCarUseCase: ListCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('ListCarUseCase', () => {
  beforeEach(async () => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarUseCase = new ListCarUseCase(carRepositoryInMemory);

    await carRepositoryInMemory.create({
      available: true,
      brand: 'abc-123',
      name: 'any_name',
      category_id: 'category_id',
      daily_rate: 150,
      description: 'any_description',
      fine_amount: 100,
      license_plate: '123-abc',
    });

    await carRepositoryInMemory.create({
      available: true,
      brand: 'abc-123',
      name: 'any_name',
      category_id: 'category_id1',
      daily_rate: 160,
      description: 'any_description1',
      fine_amount: 110,
      license_plate: '122-aba',
    });
  });

  it('should return all available cars', async () => {
    const cars_availables = await carRepositoryInMemory.listAllAvailable();

    expect(cars_availables.length).toBe(2);
  });

  it('', async () => {
    const response = await listCarUseCase.execute();

    expect(response.length).toBe(2);
  });
});
