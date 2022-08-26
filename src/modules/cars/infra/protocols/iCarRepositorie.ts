import { Car } from './iCar';

type ICarRepositorie = {
  create: (data: Car) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
  findById: (car_id: string) => Promise<Car>;
  listAllAvailable: () => Promise<Car[]>;
};

export { ICarRepositorie };
