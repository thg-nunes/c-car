import { getRepository, Repository } from 'typeorm';
import { IUserTokens } from '../../../protocols/iUserTokens';
import { UsersTokens } from '../entities/users_tokens';

class UserTokensRepositorie implements IUserTokens {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  async create({ user_id, expires_date, refash_token }): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refash_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
export { UserTokensRepositorie };
