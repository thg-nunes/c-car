import { Router } from 'express';
import { ResetPasswordController } from '../../../../modules/accounts/useCase/resetPassword/resetPasswordController';
import { SendEmailToGetResetPasswordController } from '../../../../modules/accounts/useCase/sendEmailToGetResetPassword/sendEmailToGetResetPasswordController';

const passwordRoutes = Router();

const sendEmailToGetResetPasswordController = new SendEmailToGetResetPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/send-email', sendEmailToGetResetPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
