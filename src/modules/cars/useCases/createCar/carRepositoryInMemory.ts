import { Car } from '../../infra/protocols/iCar';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';
import { CarEntity } from '../../infra/typeorm/entities/cars';

class CarRepositoryInMemory implements ICarRepositorie {
  cars: CarEntity[] = [];

  async create({ ...data }: Car): Promise<CarEntity> {
    const car = new CarEntity();

    Object.assign(car, data);

    await this.cars.push({ ...car });

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAllAvailable(): Promise<CarEntity[]> {
    const cars_available = await this.cars.filter((car) => car.available === true);
    return cars_available;
  }

  async findById(car_id: string): Promise<CarEntity> {
    const car = this.cars.find((car) => car.id === car_id);
    return car;
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === car_id);

    this.cars[findIndex].available = available;
  }
}

export { CarRepositoryInMemory };
