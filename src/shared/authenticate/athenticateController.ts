import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUseCase } from './authenticateUseCase';

class AuthenticateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUseCase = container.resolve(AuthenticateUseCase);

    const userData = await authenticateUseCase.execute({ email, password });

    return res.json(userData);
  }
}

export { AuthenticateController };
