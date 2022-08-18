import { inject } from 'tsyringe';
import { ICreateUser, ICreateUserDTO } from '../protocols/iCreateUserProtocol';

class CreateUserUseCase {
  constructor(
    @inject('UserRepositorie')
    private createUser: ICreateUser,
  ) {}

  async execute({ ...data }: ICreateUserDTO): Promise<void> {
    await this.createUser.create({ ...data });
  }
}

export { CreateUserUseCase };
