import { User } from '../infra/typeorm/entities/user';

export type ICreateUserDTO = {
  name: string;
  password: string;
  email: string;
  driver_license: string;
};

interface ICreateUser {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  deleteById(id: string): Promise<void>;
}

export { ICreateUser };
