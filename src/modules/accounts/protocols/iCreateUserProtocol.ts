import { User } from '../entities/user';

export type ICreateUserDTO = {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
};

interface ICreateUser {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export { ICreateUser };
