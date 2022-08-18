import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
import { ICreateUser, ICreateUserDTO } from '../protocols/iCreateUserProtocol';

class UserRepositorie implements ICreateUser {
  private repositorie: Repository<User>;

  constructor() {
    this.repositorie = getRepository(User);
  }

  async create({ ...data }: ICreateUserDTO): Promise<void> {
    const user = await this.repositorie.create({ ...data });

    this.repositorie.save(user);
  }
}

export { UserRepositorie };
