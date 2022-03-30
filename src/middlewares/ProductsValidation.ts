import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { IProduct } from '../interfaces';

const getSchema = (name: string, amount: string) => Joi.object({
  name: Joi.string().not().min(2).required()
    .messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be longer than 2 characters',
      'any.required': 'Name is required',
    }),
  amount: Joi.string().not().min(2).required()
    .messages({
      'string.base': 'Amount must be a string',
      'string.min': 'Amount must be longer than 2 characters',
      'any.required': 'Amount is required',
    }),
}).validate({ name, amount });

const checkFields = (req: Request, res: Response, next: NextFunction) => {
  const { name, amount }: IProduct = req.body;

  const schema = getSchema(name, amount);
  
  if (schema.error?.message.includes('required')) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: schema.error.message });
  }
  
  if (schema.error?.message.includes('must be')) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: schema.error.message });
  }

  next();
};

export default checkFields;
