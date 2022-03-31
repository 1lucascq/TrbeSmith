import OrdersModel from '../models/OrdersModel';
import connection from '../models/connection';
import { INewOrderResponse, IOrders, ITokenPayload } from '../interfaces';

export default class OrdersService {
  public ordersModel: OrdersModel;

  constructor() {
    this.ordersModel = new OrdersModel(connection);
  }

  public async getAll(): Promise<IOrders[]> {
    const orders: IOrders[] = await this.ordersModel.getAll();
    return orders;
  }

  public async create(products: number[], userData: ITokenPayload): Promise<INewOrderResponse> {
    const newOrderResponse: INewOrderResponse = await
    this.ordersModel.create(products, userData);
    
    return newOrderResponse;
  }
}
