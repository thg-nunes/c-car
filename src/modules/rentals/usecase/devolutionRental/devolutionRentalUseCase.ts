import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/providers/dayjs/protocol';
import { ICarRepositorie } from '../../../cars/infra/protocols/iCarRepositorie';
import { IRentalProtocol } from '../../infra/protocols/iRentalProtocol';
import { Rental } from '../../infra/typeorm/entities/rental';

type IRequest = {
  car_id: string;
};

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('CarRepository')
    private carRepositorie: ICarRepositorie,
    @inject('DayjsProvider')
    private dayjsProvider: IDateProvider,
    @inject('RentalRepository')
    private rentalsRepositorie: IRentalProtocol,
  ) {}

  async execute({ car_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepositorie.findById(car_id);
    const car = await this.carRepositorie.findById(rental.car_id);

    const minimumRental = 1;

    let daysOfDelay = this.dayjsProvider.diffDateInDays(rental.start_date);
    const rentalDays = this.dayjsProvider.diffDateInDays(rental.expected_return_date);

    if (daysOfDelay <= 0) {
      daysOfDelay = minimumRental;
    }

    let total = 0;

    if (daysOfDelay > 0) {
      total = daysOfDelay * car.fine_amount;
    }

    total += rentalDays * car.daily_rate;

    rental.end_date = dayjs().toDate();
    rental.total = total;

    await this.carRepositorie.updateAvailable(car.id, true);
    return await this.rentalsRepositorie.createRental(rental);
  }
}

export { DevolutionRentalUseCase };
