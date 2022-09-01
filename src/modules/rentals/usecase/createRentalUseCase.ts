import { AppError } from '../../../shared/errors/AppError';
import { IDateProvider } from '../../../shared/providers/dayjs/protocol';
import { IRentalProtocol } from '../infra/protocols/iRentalProtocol';
import { Rental } from '../infra/typeorm/entities/rental';

type IRentalDTO = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
};

class CreateRentalUseCase {
  constructor(private dateProvider: IDateProvider, private createRentalUseCase: IRentalProtocol) {}

  async execute({ car_id, user_id, expected_return_date }: IRentalDTO): Promise<Rental> {
    const minimumHoursToReturnTheCar = 24;

    const carUnavailable = await this.createRentalUseCase.findOpenRentalByCarId(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavilable!');
    }

    const userHasRent = await this.createRentalUseCase.findOpenRentalByUserId(user_id);

    if (userHasRent) {
      throw new AppError('There is already a lease for this user');
    }

    const rental = new Rental();

    const rentalHoursOfTheCar = this.dateProvider.diffDateInHours(expected_return_date);

    if (rentalHoursOfTheCar < minimumHoursToReturnTheCar) {
      throw new AppError('Invalide date to return the car.');
    }

    const rental_created = await this.createRentalUseCase.createRental(rental);

    return rental_created;
  }
}

export { CreateRentalUseCase };
