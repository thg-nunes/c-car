export type ICreateUserDTO = {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
};

interface ICreateUser {
  create(data: ICreateUserDTO): Promise<void>;
}

export { ICreateUser };
