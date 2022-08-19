import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { UserRepositorie } from '../accounts/repositorie/userRepositorie';
import { AppError } from '../../middlewares/errors/AppError';

type UserData = {
  email: string;
  password: string;
};

@injectable()
class AuthenticateUseCase {
  constructor(
    @inject('UserRepositorie')
    private userRepository: UserRepositorie,
  ) {}

  async execute({ email, password }: UserData) {
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Email or password incorrect.', 401);
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect.', 401);
    }

    const token = sign(
      {
        email: userExists.email,
        password: userExists.password,
      },
      process.env.KEY_TOKEN_GENERATE as string,
      {
        subject: userExists.id,
        expiresIn: '1d',
      },
    );

    return {
      email: userExists.email,
      username: userExists.username,
      token,
    };
  }
}

export { AuthenticateUseCase };
