import { Router } from 'express';
import { CreateRentalUseCaseController } from '../../../../modules/rentals/usecase/createRental/createRentalUseCaseController';
import { DevolutionRentalController } from '../../../../modules/rentals/usecase/devolutionRental/devolutionRentalController';
import { FindRentalsController } from '../../../../modules/rentals/usecase/findRentals/findRentalsUseController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const rentalRoutes = Router();

const createRentalUseCaseController = new CreateRentalUseCaseController();
const devolutionRentalUseCaseController = new DevolutionRentalController();
const findRentalsController = new FindRentalsController();

rentalRoutes.post('/', authUser, userIsAdmin, createRentalUseCaseController.handle);
rentalRoutes.post('/devolution/:id', authUser, devolutionRentalUseCaseController.handle);
rentalRoutes.get('/user/:id', authUser, findRentalsController.handle);

export { rentalRoutes };
