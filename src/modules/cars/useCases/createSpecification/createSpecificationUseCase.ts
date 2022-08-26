import { AppError } from '../../../../shared/errors/AppError';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';

type IRequest = {
  car_id: string;
};

class CreateSpecificationUseCase {
  constructor(private carRepository: ICarRepositorie) {}
  async execute({ car_id }: IRequest) {
    const car = await this.carRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists!');
    }

    await this.carRepository.create(car);
  }
}
export { CreateSpecificationUseCase };
