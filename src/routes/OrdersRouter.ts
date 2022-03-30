import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const router = Router();

const ordersController = new OrdersController();

router.get('/', ordersController.getAll);

export default router;