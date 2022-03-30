// import { NextFunction, Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import * as jwt from 'jsonwebtoken';
// import { INewUser } from '../interfaces';
// import 'express-async-errors';
// import UsersService from '../services/UsersService';

// const SECRET: string = process.env.JWT_SECRET;
// const JWT_CONFIG = {
//   expiresIn: '1d',
//   algorithm: 'HS256',
// };
// export default class ProductsController {
//   constructor(private usersService = new UsersService()) { }

//   public create = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { username, classe, level, password }: INewUser = req.body;
//       await this.usersService.create(username, classe, level, password);
//       const token = jwt.sign({ payload: { email } }, SECRET, JWT_CONFIG);

//       return res.status(StatusCodes.OK).json({ token });    
//     } catch (err) {
//       next(err);
//     }  
//   };
// }
