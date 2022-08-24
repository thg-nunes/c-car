import { NextFunction, Request, Response } from 'express';
import { User } from '../../modules/accounts/infra/typeorm/entities/user';
import { UserRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userRepositorie';
import { AppError } from '../errors/AppError';

async function userIsAdmin(req: Request, res: Response, next: NextFunction) {
  const { id }: User = req.body;

  const userRepository = new UserRepositorie();
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError('User is not admin!');
  }

  next();
}

export { userIsAdmin };
