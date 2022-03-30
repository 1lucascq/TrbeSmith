import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import checkFields from '../middlewares/ProductsValidation';

const router = Router();

const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', checkFields, productsController.create);

export default router;