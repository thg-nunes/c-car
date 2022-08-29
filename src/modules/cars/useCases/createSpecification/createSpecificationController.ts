import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const { specification_id, name, description } = req.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    const car = await createSpecificationUseCase.execute({
      car_id,
      specification_id,
      name,
      description,
    });

    return res.json(car);
  }
}

export { CreateSpecificationController };
