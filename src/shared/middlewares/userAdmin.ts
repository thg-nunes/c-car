import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userRepositorie';
import { AppError } from '../errors/AppError';

async function userIsAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token) {
    const [, _token] = token.split(' ');

    try {
      /* Para gerar o token, é usada a mesma chave para criar o refresh token, pois na verificação de token essa é usada para validar o token*/
      const tokenIsValid = verify(_token, process.env.KEY_REFRESH_TOKEN as string);
      const { sub: user_id } = tokenIsValid;

      const userRepositorie = new UserRepositorie();
      const userIsAdmin = await userRepositorie.findById(user_id as string);

      if (!userIsAdmin) {
        throw new AppError('User is not admin!');
      }

      next();
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export { userIsAdmin };
