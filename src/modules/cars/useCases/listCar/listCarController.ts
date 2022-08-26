import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Car } from '../../infra/protocols/iCar';
import { ListCarUseCase } from './listCarUseCase';

class ListCarController {
  async handle(req: Request, res: Response): Promise<Response<Car[]>> {
    const listCarUseCase = container.resolve(ListCarUseCase);

    const cars_availables = await listCarUseCase.execute();

    return res.json(cars_availables);
  }
}

export { ListCarController };
