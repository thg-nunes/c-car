import { UsersTokens } from '../infra/typeorm/entities/users_tokens';

type IRequest = {
  user_id: string;
  refash_token: string;
  expires_date: Date;
};

type IUserTokens = {
  create({ user_id, expires_date, refash_token }: IRequest): Promise<UsersTokens>;
};

export { IUserTokens };
