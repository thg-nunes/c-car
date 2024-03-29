import { IRentalProtocol } from '../../infra/protocols/iRentalProtocol';
import { Rental } from '../../infra/typeorm/entities/rental';

class CreateRentalUseCaseInMemory implements IRentalProtocol {
  rentals: Rental[] = [];

  async createRental(data: Rental): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      ...data,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findRentalsByUser(id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === id);
  }
}

export { CreateRentalUseCaseInMemory };
