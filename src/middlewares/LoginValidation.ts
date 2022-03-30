import 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
// import jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces';

// const SECRET: string | undefined = process.env.JWT_SECRET;
// const SECRET: string | undefined = 'a';

// const SignOptions: jwt.SignOptions = {
//   expiresIn: '1d',
//   algorithm: 'HS256',
// };

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

// const checkToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!SECRET) {
//       console.log('ERRO POR CAUSA DA LOGICA DO SECRET');
//       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'secret unavailable' });
//     }

//     const { authorization } = req.headers;
//     if (!authorization) return res.status(401).json({ message: 'Token not found' });
//     const { payload } = jwt.verify(authorization, SECRET);
//     req.email = payload.email;
//   } catch (e) {
//     console.log(e.message);
//     return res.status(401).json({ message: 'Expired or invalid token' });
//   }
//   next();
// };

// const checkLoginData = [checkData, checkToken];
const checkLoginData = [checkData];

export default checkLoginData;
