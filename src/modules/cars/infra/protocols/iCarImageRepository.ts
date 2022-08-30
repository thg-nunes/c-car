import { CarImage } from '../typeorm/entities/carImage';

export type IResquestCarImage = {
  image_name: string;
  car_id: string;
};

export type ICarImageRepository = {
  create(data: IResquestCarImage): Promise<CarImage>;
};
