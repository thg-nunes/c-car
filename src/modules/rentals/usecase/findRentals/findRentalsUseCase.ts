import { inject, injectable } from 'tsyringe';
import { Rental } from '../../infra/typeorm/entities/rental';
import { RentalRepository } from '../../infra/typeorm/repositories/rental';

@injectable()
class FindRentalsByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: RentalRepository,
  ) {}

  async execute(id: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findRentalsByUser(id);

    return rentals;
  }
}

export { FindRentalsByUserUseCase };
