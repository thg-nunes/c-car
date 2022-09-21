import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './resetPasswordUsecase';

class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password } = req.body;
    const { token } = req.query;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ password, token: String(token) });

    return res.json();
  }
}

export { ResetPasswordController };
