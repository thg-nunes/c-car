import { Rental } from '../typeorm/entities/rental';

export type RentalDTO = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;
};

type IRentalProtocol = {
  createRental(data: RentalDTO): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findRentalsByUser(id: string): Promise<Rental[]>;
};

export { IRentalProtocol };
