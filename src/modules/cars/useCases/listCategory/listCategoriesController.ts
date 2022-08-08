import { Request, Response } from 'express';
import { Category } from '../../model/category';
import { ListCategoriesUseCase } from './listCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const list_categories = this.listCategoriesUseCase.execute();

    return res.json(list_categories);
  }
}

export { ListCategoriesController };
