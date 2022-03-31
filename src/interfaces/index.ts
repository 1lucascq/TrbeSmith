import { JwtPayload } from 'jsonwebtoken';

export interface IProduct {
  id?: number;
  name: string;
  amount: string;
}

export interface IProductOrder extends IProduct{
  id: number;
  name: string;
  amount: string;
  orderId: null | number;
}

export interface IUser {
  id?: number
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface IOrders {
  id: number;
  userId: number;
  products: number[];
}

export interface ILogin {
  username: string;
  password: string;
}

export interface INewOrder {
  products: number[];
}

export interface INewOrderResponse {
  order: {
    userId: number;
    products: number[];
  }
}

export interface ITokenData {
  id: number;
  username: string;
}

export interface IProcessEnv {
  [key: string]: string | undefined
}

export interface ITokenPayload extends JwtPayload {
  payload?: {
    id: number;
    username: string;
  }
}
