import { Car } from '../../infra/protocols/iCar';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';
import { CarEntity } from '../../infra/typeorm/entities/cars';

class CarRepositoryInMemory implements ICarRepositorie {
  cars: Car[] = [];

  async create({ ...data }: Car): Promise<Car> {
    const car = new CarEntity();

    Object.assign(car, data);

    await this.cars.push({ ...car });

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarRepositoryInMemory };
