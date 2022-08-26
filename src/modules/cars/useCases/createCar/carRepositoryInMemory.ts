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

  async listAllAvailable(): Promise<Car[]> {
    const cars_available = await this.cars.filter((car) => car.available === true);
    return cars_available;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === car_id);
    return car;
  }
}

export { CarRepositoryInMemory };
