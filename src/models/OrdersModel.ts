import { Pool, RowDataPacket } from 'mysql2/promise';
import { IOrders } from '../interfaces';

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
      console.log('---------------RESULT MODEL', result);
      console.log('---------------ORDERS MODEL', orders);
      // console.log('---------------RESULT MODEL', orders);
      return orders;
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do OrdersModel.');
    }
  }

//   public async create(product: IOrders): Promise<IOrders> {
//     try {
//       const { name, amount } = product;
//       const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
//       // Não acha ResultSetHeader...
//       const result = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
//       const [dataInserted] = result;
//       const { insertId } = dataInserted;
//       return { id: insertId, ...product };
//     } catch (err) {
//       throw new Error('Erro do servidor na requisição create do OrdersModel.');
//     }
//   }
}
