import { getRepository, Repository } from 'typeorm';
import { IUserTokens } from '../../../protocols/iUserTokens';
import { UsersTokens } from '../entities/users_tokens';

class UserTokensRepositorie implements IUserTokens {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  async create({ user_id, expires_date, refrash_token }): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refrash_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndTolken({ refresh_token, user_id }): Promise<UsersTokens> {
    return await this.repository.findOne({
      where: {
        user_id,
        refrash_token: refresh_token,
      },
    });
  }

  async deleteById(user_id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(UsersTokens)
      .where('user_id= :user_id', { user_id })
      .execute();
  }
}
export { UserTokensRepositorie };
