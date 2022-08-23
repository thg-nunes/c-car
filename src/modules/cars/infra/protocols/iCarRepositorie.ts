import { Car } from './iCar';

type ICarRepositorie = {
  create: (data: Car) => Promise<void>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
};

export { ICarRepositorie };
