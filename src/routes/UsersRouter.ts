import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import checkFields from '../middlewares/UsersValidation';

const router = Router();

const usersController = new UsersController();

router.post('/', checkFields, usersController.create);

export default router;