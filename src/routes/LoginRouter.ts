import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import checkLoginData from '../middlewares/LoginValidation';

const router = Router();

const loginController = new LoginController();

router.post('/', checkLoginData, loginController.create);

export default router;