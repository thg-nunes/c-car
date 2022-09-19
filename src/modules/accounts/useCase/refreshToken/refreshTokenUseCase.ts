import { sign, verify } from 'jsonwebtoken';
import ms from 'ms';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/dayjs/protocol';
import { UserTokensRepositorie } from '../../infra/typeorm/repositorie/userTokensRepositorie';

type TokenDecode = {
  sub: string;
  email: string;
};

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepositorie')
    private userTokensRepositorie: UserTokensRepositorie,
    @inject('DayjsProvider')
    private dayjsProvider: IDateProvider,
  ) {}

  async handle(user_token: string) {
    const { sub: user_id, email } = verify(user_token, process.env.KEY_REFRESH_TOKEN) as TokenDecode;

    const userToken = await this.userTokensRepositorie.findByUserIdAndTolken({ user_id, refresh_token: user_token });

    if (!userToken) {
      throw new AppError('Token does not exists.');
    }

    await this.userTokensRepositorie.deleteById(userToken.id);

    const refresh_token = sign(
      {
        data: email,
      },
      process.env.KEY_REFRESH_TOKEN,
      {
        subject: user_id,
        expiresIn: ms('10d'),
      },
    );

    const expires_date = this.dayjsProvider.addDays(10);

    await this.userTokensRepositorie.create({
      expires_date,
      refrash_token: refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
