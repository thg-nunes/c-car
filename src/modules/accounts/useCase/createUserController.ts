import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const create_user = await container.resolve(CreateUserUseCase);

    await create_user.execute({ ...data });

    return res.status(201).send();
  }
}

export { CreateUserController };
