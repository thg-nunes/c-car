import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpLoadCarImageUseCase } from './upLoadCarImageUseCase';

type IRequest = {
  filename: string;
};

class UpLoadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const image = req.files as IRequest[];

    const upLoadCarImageUseCase = container.resolve(UpLoadCarImageUseCase);

    const image_name = image.map((file) => file.filename);

    await upLoadCarImageUseCase.execute({ car_id: id, image_name });

    return res.status(201).send();
  }
}

export { UpLoadCarImageController };
