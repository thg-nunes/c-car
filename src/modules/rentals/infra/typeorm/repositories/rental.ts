import { getRepository, Repository } from 'typeorm';
import { IRentalProtocol, RentalDTO } from '../../protocols/iRentalProtocol';
import { Rental } from '../entities/rental';

class RentalRepository implements IRentalProtocol {
  repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async createRental(data: RentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      ...data,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rentalByCar = this.repository.findOne({
      where: {
        car_id,
      },
    });

    return rentalByCar;
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rentalByUser = this.repository.findOne({
      where: {
        user_id,
      },
    });

    return rentalByUser;
  }
}

export { RentalRepository };
