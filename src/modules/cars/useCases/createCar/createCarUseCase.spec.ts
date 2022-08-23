import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/protocols/iCar';
import { CarRepositoryInMemory } from './carRepositoryInMemory';
import { CreateCarUseCase } from './createCarUseCase';

describe('CreateCarUseCase class', () => {
  it('shoud create an car if license plate not exists', async () => {
    const carRepository = new CarRepositoryInMemory();
    const sut = new CreateCarUseCase(carRepository);

    const car: Car = {
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      brand: 'any_brand',
      category_id: 'any_category_id',
      license_plate: 'any_license_plate',
      daily_rate: 100,
      fine_amount: 20,
      created_at: new Date(),
    };

    await sut.execute(car);

    expect(carRepository.cars).toHaveLength(1);
  });

  it('shoud throw an error with intance of AppError if license plate aready exists', () => {
    expect(async () => {
      const carRepository = new CarRepositoryInMemory();
      const sut = new CreateCarUseCase(carRepository);

      const car: Car = {
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
        brand: 'any_brand',
        category_id: 'any_category_id',
        license_plate: 'any_license_plate',
        daily_rate: 100,
        fine_amount: 20,
        created_at: new Date(),
      };

      await sut.execute(car);
      await sut.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });
});
