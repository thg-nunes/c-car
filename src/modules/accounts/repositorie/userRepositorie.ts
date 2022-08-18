import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from '../entities/user';
import { ICreateUser, ICreateUserDTO } from '../protocols/iCreateUserProtocol';

class UserRepositorie implements ICreateUser {
  private repositorie: Repository<User>;

  constructor() {
    this.repositorie = getRepository(User);
  }

  async create({ ...data }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(data.password, 8);

    const user = await this.repositorie.create({ ...data, password: passwordHash });

    this.repositorie.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repositorie.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { UserRepositorie };
