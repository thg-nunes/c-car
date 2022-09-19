import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserTokensRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userTokensRepositorie';
import { AppError } from '../errors/AppError';

async function authUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token) {
    const [, _token] = token.split(' ');

    try {
      /* Para gerar o token, é usada a mesma chave para criar o refresh token, pois na verificação de token essa é usada para validar o token*/
      const tokenIsValid = verify(_token, process.env.KEY_REFRESH_TOKEN as string);
      const { sub: user_id } = tokenIsValid;

      const userTokenRepositorie = new UserTokensRepositorie();
      const user = await userTokenRepositorie.findByUserIdAndTolken({
        user_id,
        refresh_token: _token,
      });

      if (!user) {
        throw new AppError('User does not exists');
      }

      next();
    } catch {
      throw new AppError('Token missing');
    }
  }
}

export { authUser };
