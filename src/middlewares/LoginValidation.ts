import 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ILogin } from '../interfaces';

const getSchema = (username: string, password: string) => Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
}).validate({ username, password });

const checkData = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as ILogin;

  const schema = getSchema(username, password);
  
  if (schema.error?.message.includes('required')) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: schema.error.message });
  }

  next();
};

const checkLoginData = [checkData];

export default checkLoginData;
