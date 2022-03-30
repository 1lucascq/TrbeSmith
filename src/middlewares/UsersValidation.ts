import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { IUser } from '../interfaces';

const getSchema = (username: string, classe: string) => Joi.object({
  username: Joi.string().not().min(3).required()
    .messages({
      'string.base': 'Username must be a string',
      'string.min': 'Username must be longer than 2 characters',
      'any.required': 'Username is required',
    }),
  classe: Joi.string().not().min(3).required()
    .messages({
      'string.base': 'Classe must be a string',
      'string.min': 'Classe must be longer than 2 characters',
      'any.required': 'Classe is required',
    }),
}).validate({ username, classe });

const getSchemaPart2 = (level: number | string, password: string) => Joi.object({
  level: Joi.number().strict().min(1).required()
    .messages({
      'number.base': 'Level must be a number',
      'number.min': 'Level must be greater than 0',
      'any.required': 'Level is required',
    }),
  password: Joi.string().not().min(8).required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be longer than 7 characters',
      'any.required': 'Password is required',
    }),
}).validate({ level, password });

const checkFirstFields = (req: Request, res: Response, next: NextFunction) => {
  const { username, classe }: IUser = req.body;

  const schema = getSchema(username, classe);
  
  if (schema.error?.message.includes('required')) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: schema.error.message });
  }
  
  if (schema.error?.message.includes('must be')) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: schema.error.message });
  }

  next();
};

const checkLastFields = (req: Request, res: Response, next: NextFunction) => {
  const { level, password }: IUser = req.body;
  const schema = getSchemaPart2(level, password);
  
  if (schema.error?.message.includes('required')) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: schema.error.message });
  }
  
  if (schema.error?.message.includes('must be')) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: schema.error.message });
  }

  next();
};

const checkFields = [checkFirstFields, checkLastFields];

export default checkFields;
