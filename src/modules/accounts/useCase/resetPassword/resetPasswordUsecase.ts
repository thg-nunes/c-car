import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUserTokens } from '../../protocols/iUserTokens';
import { IDateProvider } from '../../../../shared/providers/dayjs/protocol';
import { ICreateUser } from '../../protocols/iCreateUserProtocol';

type IRequest = {
  password: string;
  token: string;
};

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserRepositorie')
    private userRepositorie: ICreateUser,
    @inject('UserTokensRepositorie')
    private userTokensRepositorie: IUserTokens,
    @inject('DayjsProvider')
    private dayjsProvider: IDateProvider,
  ) {}

  async execute({ password, token }: IRequest) {
    const userByToken = await this.userTokensRepositorie.findByToken(token);

    if (!userByToken) {
      throw new AppError('Token is invalid.');
    }

    const date_now = dayjs().toDate();

    /** se a data de expiração do token for menor que a data atual, lança um erro avisando que o token está invalido. */
    if (this.dayjsProvider.compareIfDateIsBefore(userByToken.expires_date, date_now)) {
      throw new AppError('Token is invalid.');
    }

    const user = await this.userRepositorie.findById(userByToken.user_id);

    await this.userRepositorie.deleteById(userByToken.id);

    await this.userRepositorie.create({ ...user, password });
  }
}

export { ResetPasswordUseCase };
