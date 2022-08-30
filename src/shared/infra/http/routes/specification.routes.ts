import { Router } from 'express';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification.ts/createSpecificationController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const specifications = Router();

const createSpecificationController = new CreateSpecificationController();

specifications.post('/', authUser, userIsAdmin, createSpecificationController.handle);

export { specifications };
