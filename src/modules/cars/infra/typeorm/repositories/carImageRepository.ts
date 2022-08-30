import { getRepository, Repository } from 'typeorm';
import { ICarImageRepository, IResquestCarImage } from '../../protocols/iCarImageRepository';
import { CarImage } from '../entities/carImage';

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: IResquestCarImage): Promise<CarImage> {
    const car_image = this.repository.create({ car_id, image_name });

    await this.repository.save(car_image);

    return car_image;
  }
}

export { CarImageRepository };
