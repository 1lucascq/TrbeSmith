import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import checkNewOrders from '../middlewares/OrdersValidation';

const router = Router();

const ordersController = new OrdersController();

router.get('/', ordersController.getAll);
router.post('/', checkNewOrders, ordersController.create);

export default router;