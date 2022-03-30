import { Router } from 'express';
import ProductsRouter from './ProductsRouter';
import UsersRouter from './UsersRouter';
import OrdersRouter from './OrdersRouter';
// import LoginRouter from './LoginRouter';

const router = Router();

router.use('/products', ProductsRouter);
router.use('/users', UsersRouter);
router.use('/orders', OrdersRouter);
// router.use('/login', LoginRouter);

export default router;