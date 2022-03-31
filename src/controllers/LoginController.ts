import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';
import 'express-async-errors';
import LoginService from '../services/LoginService';

const SECRET = 'segredoSecreto';

const SignOptions: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!SECRET) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'secret unavailable' });
      }

      const { username, password }: IUser = req.body;
      
      const id: number | false | undefined = await this.loginService.login({ username, password });
      
      if (!id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          error: 'Username or password invalid',
        });
      }
      
      const token = jwt.sign({ payload: { id, username } }, SECRET, SignOptions);

      return res.status(StatusCodes.OK).json({ token });    
    } catch (err) {
      next(err);
    }  
  };
}
