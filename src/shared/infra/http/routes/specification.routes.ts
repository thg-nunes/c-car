import { Request, Response, Router } from 'express';
import { authUser } from '../../../middlewares/authUser';
import { SpecificationRepository } from '../../../../modules/cars/infra/typeorm/repositories/category/specificationRepository';
import { CreateSpecificationService } from '../../../../modules/cars/useCases/createSpecification/createSpecificationService';

const specificationRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationRoutes.use(authUser);

specificationRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;

  const specification_repository = new CreateSpecificationService(specificationRepository);

  specification_repository.execute({ name, description });

  return res.status(201).send();
});

export { specificationRoutes };
