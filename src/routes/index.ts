import { Router } from 'express';
import ContactsRouter from './Products';

const router = Router();

router.use('/products', ContactsRouter);
router.use('/users', ContactsRouter);
router.use('/orders', ContactsRouter);
router.use('/login', ContactsRouter);

export default router;