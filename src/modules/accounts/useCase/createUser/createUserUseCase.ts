import { inject, injectable } from 'tsyringe';
import { ICreateUser, ICreateUserDTO } from '../../protocols/iCreateUserProtocol';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepositorie')
    private createUser: ICreateUser,
  ) {}

  async execute({ ...data }: ICreateUserDTO): Promise<void> {
    const user_already_exists = await this.createUser.findByEmail(data.email);

    if (user_already_exists) {
      throw new Error('Esse email ja existe.');
    }

    await this.createUser.create({ ...data });
  }
}

export { CreateUserUseCase };
