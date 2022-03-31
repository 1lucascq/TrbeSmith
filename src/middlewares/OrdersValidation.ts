import 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { INewOrder } from '../interfaces';

const SECRET = 'a';

const getSchema = (products: number[]) => Joi.object({
  products: Joi.array().items(Joi.number().strict().min(1)).min(1).required()
    .messages({
      'array.min': 'Products can\'t be empty',
      'array.base': 'Products must be an array of numbers',
      'any.required': 'Products is required',
    }),
}).validate({ products });

const checkFields = (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body as INewOrder;

  const schema = getSchema(products);

  if (schema.error?.message.includes('empty')) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: schema.error.message });
  }

  if (schema.error?.message.includes('must be')) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: schema.error.message });
  }
  
  if (schema.error?.message.includes('required')) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Products is required' });
  }

  next();
};

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    const { payload } = jwt.verify(authorization, SECRET) as JwtPayload;
    
    const { id, username } = payload;
    req.userData = { id, username };
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: 'Invalid token' });
  }
  next();
};

const checkNewOrders = [checkToken, checkFields];

export default checkNewOrders;
