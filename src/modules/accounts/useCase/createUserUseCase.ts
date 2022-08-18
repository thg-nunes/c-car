import { inject, injectable } from 'tsyringe';
import { ICreateUser, ICreateUserDTO } from '../protocols/iCreateUserProtocol';

@injectable()
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
