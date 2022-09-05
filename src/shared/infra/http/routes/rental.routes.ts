import { Router } from 'express';
import { CreateRentalUseCaseController } from '../../../../modules/rentals/usecase/createRental/createRentalUseCaseController';
import { authUser } from '../../../middlewares/authUser';
import { userIsAdmin } from '../../../middlewares/userAdmin';

const rentalRoutes = Router();

const createRentalUseCaseController = new CreateRentalUseCaseController();

rentalRoutes.post('/', authUser, userIsAdmin, createRentalUseCaseController.handle);

export { rentalRoutes };
