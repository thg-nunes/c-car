import { Router } from 'express';
import { SendEmailToGetResetPasswordController } from '../../../../modules/accounts/useCase/sendEmailToGetResetPassword/sendEmailToGetResetPasswordController';

const passwordRoutes = Router();

const sendEmailToGetResetPasswordController = new SendEmailToGetResetPasswordController();

passwordRoutes.post('/reset', sendEmailToGetResetPasswordController.handle);

export { passwordRoutes };
