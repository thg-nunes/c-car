import { getRepository, Repository } from 'typeorm';
import { Car } from '../../../protocols/iCar';
import { ICarRepositorie } from '../../../protocols/iCarRepositorie';
import { CarEntity } from '../../entities/cars';

class CarRepository implements ICarRepositorie {
  private repository: Repository<CarEntity>;

  constructor() {
    this.repository = getRepository(CarEntity);
  }

  async create(data: Car): Promise<void> {
    const car = await this.repository.create({
      ...data,
    });

    await this.repository.save(car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }
}

export { CarRepository };
