import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/protocols/iCar';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';

class CreateCarUseCase {
  constructor(private carRepository: ICarRepositorie) {}

  async execute({ ...data }: Car): Promise<Car | void> {
    const carAlreadyExists = await this.carRepository.findByLicensePlate(data.license_plate);

    if (carAlreadyExists) {
      throw new AppError('Car already exists');
    }

    const car = await this.carRepository.create({ ...data });

    return car;
  }
}

export { CreateCarUseCase };
