import { getRepository, Repository } from 'typeorm';
import { Car } from '../../../protocols/iCar';
import { ICarRepositorie } from '../../../protocols/iCarRepositorie';
import { CarEntity } from '../../entities/cars';

class CarRepository implements ICarRepositorie {
  private repository: Repository<CarEntity>;

  constructor() {
    this.repository = getRepository(CarEntity);
  }

  async create(data: Car): Promise<Car> {
    const car = this.repository.create({
      ...data,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }

  async listAllAvailable(): Promise<Car[]> {
    const cars_availables = await this.repository.find({
      where: {
        available: true,
      },
    });

    return cars_availables;
  }
}

export { CarRepository };
