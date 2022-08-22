import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userRepositorie';
import { AppError } from '../errors/AppError';

async function authUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token) {
    const [, _token] = token.split(' ');

    try {
      const tokenIsValid = verify(_token, process.env.KEY_TOKEN_GENERATE as string);
      const { sub: user_id } = tokenIsValid;

      const userRepositorie = new UserRepositorie();
      const user = await userRepositorie.findById(user_id as string);

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
