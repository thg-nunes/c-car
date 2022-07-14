import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './createCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createCategory.excute({ name, description });

    return res.status(201).send();
  }
}

export { CreateCategoryController };
