import { getRepository, Repository } from 'typeorm';
import { Car } from '../../protocols/iCar';
import { ICarRepositorie } from '../../protocols/iCarRepositorie';
import { CarEntity } from '../entities/cars';

class CarRepository implements ICarRepositorie {
  private repository: Repository<CarEntity>;

  constructor() {
    this.repository = getRepository(CarEntity);
  }

  async create(data: Car): Promise<CarEntity> {
    const car = this.repository.create({
      ...data,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<CarEntity> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }

  async listAllAvailable(): Promise<CarEntity[]> {
    const cars_availables = await this.repository.find({
      where: {
        available: true,
      },
    });

    return cars_availables;
  }

  async findById(car_id: string): Promise<CarEntity> {
    const car = await this.repository.findOne({ id: car_id });
    return car;
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder().update().set({ available }).where('id = :id', { id: car_id }).execute();
  }
}

export { CarRepository };
