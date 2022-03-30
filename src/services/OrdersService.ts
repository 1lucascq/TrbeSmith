import OrdersModel from '../models/OrdersModel';
import connection from '../models/connection';
import { IOrders } from '../interfaces';

export default class OrdersService {
  public OrdersModel: OrdersModel;
  
  constructor() {
    this.OrdersModel = new OrdersModel(connection);
  }

  public async getAll(): Promise<IOrders[]> {
    const orders: IOrders[] = await this.OrdersModel.getAll();
    return orders;
  }

  // public async create(product: IProduct): Promise<IProduct> {
  //   const newProduct: IProduct = await this.OrdersModel.create(product);
  //   return newProduct;
  // }
}
