import { Category } from '../entities/category';

// DTO - data transfer object: é um objeto responsável por capturar os dados de uma rota e passá-los para uma classe
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

/** Linkov substitution principle - essa interface é criada para aplicação do principrio de liskov, onde deve ser possível a substituição de
 * classes que são de um mesmo subtipo.
 */
interface IRepositorie {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  categoryExists(name: string): Promise<Category | undefined>;
}

export { IRepositorie, ICreateCategoryDTO };
