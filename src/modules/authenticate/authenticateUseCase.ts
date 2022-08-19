import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { UserRepositorie } from '../accounts/repositorie/userRepositorie';

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
      throw new Error('Email or password incorrect.');
    }

    const passwordMatch = compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect.');
    }

    const token = sign(
      {
        email: userExists.email,
        password: userExists.password,
      },
      process.env.KEY_TOKEN_GENERATE as string,
      {
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
