import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './refreshTokenUseCase';

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.handle(token);

    return res.json({
      refreshToken,
    });
  }
}

export { RefreshTokenController };
