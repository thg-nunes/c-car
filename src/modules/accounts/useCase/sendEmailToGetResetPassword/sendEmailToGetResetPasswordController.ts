import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendEmailToGetResetPasswordUseCase } from './sendEmailToGetResetPasswordUseCase';

class SendEmailToGetResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmailToGetResetPasswordUseCase = container.resolve(SendEmailToGetResetPasswordUseCase);

    await sendEmailToGetResetPasswordUseCase.execute(email);

    return res.send();
  }
}

export { SendEmailToGetResetPasswordController };
