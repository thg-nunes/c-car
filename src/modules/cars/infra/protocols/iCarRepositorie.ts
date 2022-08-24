import { Car } from './iCar';

type ICarRepositorie = {
  create: (data: Car) => Promise<Car>;
  findByLicensePlate: (license_plate: string) => Promise<Car>;
  listAllAvailable: () => Promise<Car[]>;
};

export { ICarRepositorie };
