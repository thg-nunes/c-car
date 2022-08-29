import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/createSpecificationController';
import { ListCarController } from '../../../../modules/cars/useCases/listCar/listCarController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const cars = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const createSpecification = new CreateSpecificationController();

cars.post('/', authUser, userIsAdmin, createCarController.handle);
cars.get('/available', listCarController.handle);
cars.post('/specifications/:id', authUser, userIsAdmin, createSpecification.handle);

export { cars };
