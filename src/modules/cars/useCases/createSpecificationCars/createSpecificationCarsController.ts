import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationCarsUseCase } from './createSpecificationCarsUseCase';

class CreateSpecificationCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { specification_id } = req.body;

    const createSpecificationCarsUseCase = container.resolve(CreateSpecificationCarsUseCase);

    const car = await createSpecificationCarsUseCase.execute({
      car_id,
      specification_id,
    });

    return res.json(car);
  }
}

export { CreateSpecificationCarsController };
