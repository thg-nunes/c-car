import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/dayjs/protocol';
import { ICarRepositorie } from '../../../cars/infra/protocols/iCarRepositorie';
import { IRentalProtocol } from '../../infra/protocols/iRentalProtocol';
import { Rental } from '../../infra/typeorm/entities/rental';

type IRentalDTO = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('DayjsProvider')
    private dateProvider: IDateProvider,
    @inject('RentalRepository')
    private createRentalUseCase: IRentalProtocol,
    @inject('CarRepository')
    private carRepository: ICarRepositorie,
  ) {}

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

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
    });

    const rental_created = await this.createRentalUseCase.createRental(rental);

    await this.carRepository.updateAvailable(car_id, false);

    return rental_created;
  }
}

export { CreateRentalUseCase };
