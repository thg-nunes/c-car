import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from './createCategoryUseCase';

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.excute({ name, description });

    return res.status(201).send();
  }

  async getCategories(req: Request, res: Response): Promise<Response> {
    const categoriesUseCase = container.resolve(CreateCategoryUseCase);

    const categories = await categoriesUseCase.categories();

    return res.json(categories);
  }
}

export { CreateCategoryController };
