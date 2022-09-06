import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUseCase } from './devolutionRentalUseCase';

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ car_id: id });

    return res.json(rental);
  }
}

export { DevolutionRentalController };
