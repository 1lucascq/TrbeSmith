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

// export interface IUserWithId {
//   id?: number
//   username: string;
//   classe: string;
//   level: number;
//   password: string;
// }

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

export interface ProcessEnv {
  [key: string]: string | undefined
}