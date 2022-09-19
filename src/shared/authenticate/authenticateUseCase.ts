import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import ms from 'ms';

import { UserRepositorie } from '../../modules/accounts/infra/typeorm/repositorie/userRepositorie';
import { AppError } from '../errors/AppError';
import { IUserTokens } from '../../modules/accounts/protocols/iUserTokens';
import { DayjsProvider } from '../providers/dayjs/Dayjs';

type UserData = {
  email: string;
  password: string;
};

@injectable()
class AuthenticateUseCase {
  constructor(
    @inject('UserRepositorie')
    private userRepository: UserRepositorie,
    @inject('UserTokensRepositorie')
    private createUserTokens: IUserTokens,
    @inject('DayjsProvider')
    private dayJsProvider: DayjsProvider,
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
        expiresIn: ms('15m'),
      },
    );

    const refresh_token = sign(
      {
        data: userExists.email,
      },
      process.env.KEY_REFRESH_TOKEN,
      {
        subject: userExists.id,
        expiresIn: ms('10d'),
      },
    );

    const expires_date_refresh_token = this.dayJsProvider.addDays(10);

    await this.createUserTokens.deleteById(userExists.id);

    await this.createUserTokens.create({
      user_id: userExists.id,
      refrash_token: refresh_token,
      expires_date: expires_date_refresh_token,
    });

    return {
      user: {
        id: userExists.id,
        email: userExists.email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUseCase };
