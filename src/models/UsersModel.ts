import { Pool, RowDataPacket } from 'mysql2/promise';
import { IProduct } from '../interfaces';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    try {
      const query = 'SELECT * FROM Products';
      const result = await this.connection.execute<RowDataPacket[]>(query);
      const [users] = result;
      return users as IProduct[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do model.');
    }
  }

  public async create(name: string, amount: number): Promise<IProduct[]> {
    try {
      const query = 'INSERT INTO Products (name, amount) VALUES (?, ?)';
      // Não acha ResultSetHeader...
      const result = await this.connection.execute(query, [name, amount]);
      const [users] = result;
      return users as IProduct[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do model.');
    }
  }
}