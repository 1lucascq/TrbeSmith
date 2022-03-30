import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IOrders } from '../interfaces';
import OrdersService from '../services/OrdersService';
import 'express-async-errors';

export default class OrdersController {
  constructor(private ordersServices = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders: IOrders[] = await this.ordersServices.getAll();
      return res.status(StatusCodes.OK).json(orders);
    } catch (err) {
      next(err);
    }  
  };

  // public create = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { name, amount } = req.body;
  //     const newProduct: IOrders = await this.productsServices.create({ name, amount });
  //     return res.status(StatusCodes.CREATED).json({ item: newProduct });
  //   } catch (err) {
  //     next(err);
  //   }  
  // };
}
