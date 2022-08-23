import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Car } from '../../infra/protocols/iCar';
import { CreateCarUseCase } from './createCarUseCase';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { ...data }: Car = req.body;

    const createCar = container.resolve(CreateCarUseCase);

    const car = await createCar.execute({
      ...data,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
