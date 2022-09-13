import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindRentalsByUserUseCase } from './findRentalsUseCase';

class FindRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findRentalsByUserUseCase = container.resolve(FindRentalsByUserUseCase);

    const rentals = await findRentalsByUserUseCase.execute(id);

    return res.json(rentals);
  }
}

export { FindRentalsController };
