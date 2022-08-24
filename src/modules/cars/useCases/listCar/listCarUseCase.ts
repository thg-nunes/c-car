import { inject, injectable } from 'tsyringe';
import { Car } from '../../infra/protocols/iCar';
import { ICarRepositorie } from '../../infra/protocols/iCarRepositorie';

@injectable()
class ListCarUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepositorie,
  ) {}

  async execute(): Promise<Car[]> {
    const cars_availables = await this.carRepository.listAllAvailable();
    return cars_availables;
  }
}
export { ListCarUseCase };
