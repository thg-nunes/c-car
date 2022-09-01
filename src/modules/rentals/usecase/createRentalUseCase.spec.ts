import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { AppError } from '../../../shared/errors/AppError';
import { CreateRentalUseCase } from './createRentalUseCase';
import { CreateRentalUseCaseInMemory } from './createRentalUseCaseInMemory';

let createRentalUseCase: CreateRentalUseCase;
let createRentalUseCaseInMemory: CreateRentalUseCaseInMemory;

describe('CreateRentalUseCase', () => {
  dayjs.extend(utc);
  const dateToReturnTheCar = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    createRentalUseCaseInMemory = new CreateRentalUseCaseInMemory();
    createRentalUseCase = new CreateRentalUseCase(createRentalUseCaseInMemory);
  });

  it('shold create an new rental', async () => {
    const rental = {
      car_id: 'any_car_id',
      user_id: 'any_user_id',
      expected_return_date: dateToReturnTheCar,
    };

    await createRentalUseCase.execute(rental);

    expect(createRentalUseCaseInMemory.rentals.length).toBe(1);
  });

  it('shold throw an AppError if car already rented', () => {
    expect(async () => {
      const rental1 = {
        car_id: 'any_car_id',
        user_id: 'any_user_id',
        expected_return_date: new Date(),
      };

      const rental2 = {
        car_id: 'any_car_id',
        user_id: 'any_user_id',
        expected_return_date: new Date(),
      };

      await createRentalUseCase.execute(rental1);
      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shold throw an AppError if user already rented car', () => {
    expect(async () => {
      const rental1 = {
        car_id: 'any_car_id',
        user_id: 'any_user_id',
        expected_return_date: new Date(),
      };

      const rental2 = {
        car_id: 'any_car_id',
        user_id: 'any_user_id',
        expected_return_date: new Date(),
      };

      await createRentalUseCase.execute(rental1);
      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a new rental if the car does not have rented and user does not have an rent car', async () => {
    const rental1 = {
      car_id: 'any_car_id_1',
      user_id: 'any_user_id_1',
      expected_return_date: dateToReturnTheCar,
    };

    const rental2 = {
      car_id: 'any_car_id_2',
      user_id: 'any_user_id_2',
      expected_return_date: dateToReturnTheCar,
    };

    await createRentalUseCase.execute(rental1);
    await createRentalUseCase.execute(rental2);

    expect(createRentalUseCaseInMemory.rentals.length).toBe(2);
  });

  it('shold throw an AppError if date to return the car less than 24 hours', () => {
    expect(async () => {
      const rental = {
        car_id: 'any_car_id',
        user_id: 'any_user_id',
        expected_return_date: new Date(),
      };

      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
