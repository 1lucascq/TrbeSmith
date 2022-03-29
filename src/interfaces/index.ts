export interface INewProduct {
  name: string;
  amount: number;
}

export interface IProduct extends INewProduct{
  id: number;
  name: string;
  amount: number;
  orderId: null | number;
}

export interface INewUser {
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
