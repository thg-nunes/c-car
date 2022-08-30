import { inject, injectable } from 'tsyringe';
import { ICarImageRepository } from '../../infra/protocols/iCarImageRepository';

type IRequest = {
  car_id: string;
  image_name: string[];
};

@injectable()
class UpLoadCarImageUseCase {
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
  ) {}

  async execute({ car_id, image_name }: IRequest): Promise<void> {
    image_name.map(async (name) => {
      await this.carImageRepository.create({ car_id, image_name: name });
    });
  }
}

export { UpLoadCarImageUseCase };
