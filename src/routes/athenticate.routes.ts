import { Router } from 'express';
import { AuthenticateController } from '../modules/authenticate/athenticateController';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post('/authenticate', authenticateController.handle);

export { authenticateRoutes };
