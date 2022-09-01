import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AppError } from '../../../shared/errors/AppError';
import { IRentalProtocol } from '../infra/protocols/iRentalProtocol';
import { Rental } from '../infra/typeorm/entities/rental';

type IRentalDTO = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
};

class CreateRentalUseCase {
  constructor(private createRentalUseCase: IRentalProtocol) {}

  async execute({ car_id, user_id, expected_return_date }: IRentalDTO): Promise<Rental> {
    dayjs.extend(utc);
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

    /* a linha seguinte pega a data esperada para devolução do carro e converte para o formato de data local */
    const expectedReturnDate = dayjs(expected_return_date).utc().local().format();

    /* a linha seguinte pega a data atual */
    const dateNow = dayjs().utc().local().format();

    const compareDate = dayjs(expectedReturnDate).diff(dateNow, 'hours');

    if (compareDate < minimumHoursToReturnTheCar) {
      throw new AppError('Invalide date to return the car.');
    }

    const rental_created = await this.createRentalUseCase.createRental(rental);

    return rental_created;
  }
}

export { CreateRentalUseCase };
