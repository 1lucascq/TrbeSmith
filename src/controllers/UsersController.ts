import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';
import 'express-async-errors';
import UsersService from '../services/UsersService';

const SECRET: string | undefined = process.env.JWT_SECRET;
const SignOptions: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
export default class UsersController {
  constructor(private usersService = new UsersService()) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!SECRET) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'secret unavailable' });
      }

      const { username, classe, level, password }: IUser = req.body;
      const payload = await this.usersService.create({ username, classe, level, password });
      // const token = jwt.sign({ payload: { username, classe, level } }, SECRET, SignOptions);
      const token = jwt.sign(payload, SECRET, SignOptions);

      return res.status(StatusCodes.CREATED).json({ token });    
    } catch (err) {
      next(err);
    }  
  };
}
