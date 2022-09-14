import { UsersTokens } from '../infra/typeorm/entities/users_tokens';

type IRequest = {
  user_id: string;
  refrash_token: string;
  expires_date: Date;
};

type IUserTokens = {
  create({ user_id, expires_date, refrash_token }: IRequest): Promise<UsersTokens>;
};

export { IUserTokens };
