import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './createRentalUseCase';

class CreateRentalUseCaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date, user_id } = req.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id,
    });

    return res.status(201).json(rental);
  }
}

export { CreateRentalUseCaseController };
