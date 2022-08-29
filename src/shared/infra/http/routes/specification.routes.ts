import { Request, Response, Router } from 'express';
import { authUser } from '../../../middlewares/authUser';
import { SpecificationRepository } from '../../../../modules/cars/infra/typeorm/repositories/specificationRepository';
import { CreateSpecificationUseCase } from '../../../../modules/cars/useCases/createSpecification/createSpecificationUseCase';
import { CarRepository } from '../../../../modules/cars/infra/typeorm/repositories/carRepository';

const specificationRoutes = Router();
const carRepository = new CarRepository();
const specificationRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(carRepository, specificationRepository);

specificationRoutes.use(authUser);

specificationRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
});

export { specificationRoutes };
