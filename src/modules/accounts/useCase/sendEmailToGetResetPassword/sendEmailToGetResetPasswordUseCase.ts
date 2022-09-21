import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { resolve } from 'path';

import { AppError } from '../../../../shared/errors/AppError';
import { DayjsProvider } from '../../../../shared/providers/dayjs/Dayjs';
import { EtherialMailProtocol } from '../../../../shared/providers/mailProvider/protocol';
import { UserRepositorie } from '../../infra/typeorm/repositorie/userRepositorie';
import { UserTokensRepositorie } from '../../infra/typeorm/repositorie/userTokensRepositorie';

@injectable()
class SendEmailToGetResetPasswordUseCase {
  constructor(
    @inject('UserRepositorie')
    private userRepositorie: UserRepositorie,
    @inject('UserTokensRepositorie')
    private userTokensRepositorie: UserTokensRepositorie,
    @inject('DayjsProvider')
    private dayjsProvider: DayjsProvider,
    @inject('EtherialMailProvider')
    private etherialMailProvider: EtherialMailProtocol,
  ) {}

  async execute(email: string) {
    const user = await this.userRepositorie.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const token = uuid();

    const expires_date = this.dayjsProvider.addHours(3);

    await this.userTokensRepositorie.deleteById(user.id);

    await this.userTokensRepositorie.create({
      user_id: user.id,
      refrash_token: token,
      expires_date,
    });

    const path = resolve(__dirname, '..', '..', 'views', 'emails', 'emailResetPassword.hbs');

    const variables = {
      name: user.name,
      link: `${process.env.URL_RESET_PASSWORD}${token}`,
    };

    await this.etherialMailProvider.sendMail(email, 'Recuperação de senha', path, variables);
  }
}

export { SendEmailToGetResetPasswordUseCase };
