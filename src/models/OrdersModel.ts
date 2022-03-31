import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { INewOrderResponse, IOrders, ITokenPayload } from '../interfaces';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrders[]> {
    try {
      const q1 = 'SELECT * FROM Trybesmith.Orders o ';
      const q2 = 'INNER JOIN Trybesmith.Products p ON o.id = p.orderId';
      const [result] = await this.connection.execute<RowDataPacket[]>(q1.concat(q2));
      const orders = result.map((order) => {
        const { id, userId } = order;
        return { id, userId, products: [id] };
      });
      return orders;
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do OrdersModel.');
    }
  }

  public async create(products: number[], userData: ITokenPayload): Promise<INewOrderResponse> {
    try {
      const qOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
      const qPrd = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';
      const [newOrderData] = await this.connection.execute<ResultSetHeader>(qOrder, [userData.id]);
      const { insertId } = newOrderData;

      products.forEach(async (product) => {
        await this.connection.execute<ResultSetHeader>(qPrd, [insertId, product]);
      });

      return { order: { userId: userData.id, products } } as INewOrderResponse;
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do OrdersModel.');
    }
  }
}
