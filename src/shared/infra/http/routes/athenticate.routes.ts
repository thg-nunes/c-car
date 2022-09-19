import { Router } from 'express';
import { RefreshTokenController } from '../../../../modules/accounts/useCase/refreshToken/refreshTokenController';
import { AuthenticateController } from '../../../authenticate/athenticateController';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/authenticate', authenticateController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
