import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController';

const cars = Router();

const createCarController = new CreateCarController();

cars.post('/', createCarController.handle);

export { cars };
