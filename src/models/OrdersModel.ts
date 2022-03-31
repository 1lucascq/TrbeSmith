import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
// import { INewOrder, INewOrderResponse, IOrders, IProduct, ITokenPayload } from '../interfaces';
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

  public async create(orderProducts: number[], usrData: ITokenPayload): Promise<INewOrderResponse> {
    try {
      const qOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
      const qPrd = 'UPDATE Trybesmith.Orders SET orderId = ? WHERE id = ?';
      const [newOrderData] = await this.connection.execute<ResultSetHeader>(qOrder, [usrData.id]);
      const { insertId } = newOrderData;

      orderProducts.forEach(async (product) => {
        await this.connection.execute<ResultSetHeader>(qPrd, [insertId, product]);
      });
      return { order: { userId: usrData.id, products: orderProducts } } as INewOrderResponse;
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do OrdersModel.');
    }
  }
}

// const result = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
// const [dataInserted] = result;
// const { insertId } = dataInserted;
// return { id: insertId, ...newOrder };

// public async create(or: number[], usr: ITokenPayload, p: IProduct[]): Promise<INewOrderResponse> {
//   try {
//     // const { username, id } = userData;
//     const qOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
//     const qProduct = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
//     const newOrderResult = await this.connection.execute<ResultSetHeader>(qOrder, [usr.id]);
//     const [dataInserted] = newOrderResult;
//     const { insertId } = dataInserted;

//     or.forEach(async (product) => {
//       const result = await this.connection.execute<ResultSetHeader>(qProduct, [name, amount]);
//       const [dataInserted] = result;
//       const { insertId } = dataInserted;
//       return { id: insertId, ...newOrder };
//     });
//   } catch (err) {
//     throw new Error('Erro do servidor na requisição create do OrdersModel.');
//   }
// }