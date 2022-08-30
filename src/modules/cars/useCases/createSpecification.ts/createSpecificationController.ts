import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    const specification = await createSpecificationUseCase.execute({ name, description });

    return res.json(specification);
  }
}

export { CreateSpecificationController };
