import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProduct, IProductOrder } from '../interfaces';
import 'express-async-errors';
import ProductsService from '../services/ProductsService';

export default class ProductsController {
  constructor(private productsServices = new ProductsService()) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products: IProductOrder[] = await this.productsServices.getAll();
      return res.status(StatusCodes.OK).json(products);
    } catch (err) {
      next(err);
    }  
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, amount } = req.body;
      const newProduct: IProduct = await this.productsServices.create({ name, amount });
      return res.status(StatusCodes.CREATED).json({ item: newProduct });
    } catch (err) {
      next(err);
    }  
  };
}
