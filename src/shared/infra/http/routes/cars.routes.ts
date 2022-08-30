import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController';
import { CreateSpecificationCarsController } from '../../../../modules/cars/useCases/createSpecificationCars/createSpecificationCarsController';
import { ListCarController } from '../../../../modules/cars/useCases/listCar/listCarController';
import { UpLoadCarImageController } from '../../../../modules/cars/useCases/upLoadCarImage/upLoadCarImageController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const cars = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const createSpecification = new CreateSpecificationCarsController();
const upLoadCarImageController = new UpLoadCarImageController();

const uploadImageCar = multer(uploadConfig.upload('./tmp/cars'));

cars.post('/', authUser, userIsAdmin, createCarController.handle);
cars.get('/available', listCarController.handle);
cars.post('/specifications/:id', authUser, userIsAdmin, createSpecification.handle);
cars.post('/images/:id', uploadImageCar.array('images'), authUser, userIsAdmin, upLoadCarImageController.handle);

export { cars };
