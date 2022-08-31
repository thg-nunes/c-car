import { CreateRentalUseCase } from './createRentalUseCase';
import { CreateRentalUseCaseInMemory } from './createRentalUseCaseInMemory';

let createRentalUseCase: CreateRentalUseCase;
let createRentalUseCaseInMemory: CreateRentalUseCaseInMemory;

describe('CreateRentalUseCase', () => {
  beforeEach(() => {
    createRentalUseCaseInMemory = new CreateRentalUseCaseInMemory();
    createRentalUseCase = new CreateRentalUseCase(createRentalUseCaseInMemory);
  });

  it('shold create an new rental', async () => {
    const rental = {
      car_id: 'any_car_id',
      user_id: 'any_user_id',
      expected_return_date: new Date(),
    };

    await createRentalUseCase.execute(rental);

    expect(createRentalUseCaseInMemory.rentals.length).toBe(1);
  });
});
