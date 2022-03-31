import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { INewOrderResponse, IOrders } from '../interfaces';
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

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { products } = req.body;
      const { authorization } = req.headers;
      const { userData } = req;

      if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ error: 'Unauthorized' });
      }
      if (!userData) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });

      const newOrder: INewOrderResponse = await this.ordersServices.create(products, userData);
      return res.status(StatusCodes.CREATED).json(newOrder);
    } catch (err) {
      next(err);
    }  
  };
}
