import { CarEntity } from '../typeorm/entities/cars';
import { Car } from './iCar';

type ICarRepositorie = {
  create: (data: Car) => Promise<CarEntity>;
  findByLicensePlate: (license_plate: string) => Promise<CarEntity>;
  findById: (car_id: string) => Promise<CarEntity>;
  listAllAvailable: () => Promise<CarEntity[]>;
  updateAvailable(car_id: string, available: boolean): Promise<void>;
};

export { ICarRepositorie };
