import { UsersTokens } from '../infra/typeorm/entities/users_tokens';

type IRequest = {
  user_id: string;
  refrash_token: string;
  expires_date: Date;
};

type FindRefreshToken = {
  user_id: string;
  refresh_token: string;
};

type IUserTokens = {
  create({ user_id, expires_date, refrash_token }: IRequest): Promise<UsersTokens>;
  findByUserIdAndTolken({ refresh_token, user_id }: FindRefreshToken): Promise<UsersTokens>;
  deleteById(user_id: string): Promise<void>;
  findByToken(refresh_token: string): Promise<UsersTokens>;
};

export { IUserTokens };
