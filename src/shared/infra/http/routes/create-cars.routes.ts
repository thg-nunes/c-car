import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const cars = Router();

const createCarController = new CreateCarController();

cars.post('/', authUser, userIsAdmin, createCarController.handle);

export { cars };
