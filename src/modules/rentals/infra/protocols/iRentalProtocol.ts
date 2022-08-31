import { Rental } from '../typeorm/entities/rental';

type IRentalProtocol = {
  createRental(data: Rental): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
};

export { IRentalProtocol };
