import { Router } from 'express';
import { CreateRentalUseCaseController } from '../../../../modules/rentals/usecase/createRental/createRentalUseCaseController';
import { DevolutionRentalController } from '../../../../modules/rentals/usecase/devolutionRental/devolutionRentalController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const rentalRoutes = Router();

const createRentalUseCaseController = new CreateRentalUseCaseController();
const devolutionRentalUseCaseController = new DevolutionRentalController();

rentalRoutes.post('/', authUser, userIsAdmin, createRentalUseCaseController.handle);
rentalRoutes.post('/devolution/:id', authUser, devolutionRentalUseCaseController.handle);

export { rentalRoutes };
